import { supabase } from '../lib/supabase';
import { redis } from '../lib/redis';
import { CreateClientDTO, UpdateClientDTO, Client } from '../types/client';

export class ClientService {
  private static REDIS_PREFIX = 'client:';

  private static getRedisKey(slug: string): string {
    return `${this.REDIS_PREFIX}${slug}`;
  }

  static async create(data: CreateClientDTO): Promise<Client> {
    // Insert into PostgreSQL
    const { data: client, error } = await supabase
      .from('my_client')
      .insert([{ ...data, created_at: new Date().toISOString() }])
      .select()
      .single();

    if (error) throw error;

    // Store in Redis
    await redis.set(this.getRedisKey(client.slug), JSON.stringify(client));

    return client;
  }

  static async update(data: UpdateClientDTO): Promise<Client> {
    // Update in PostgreSQL
    const { data: client, error } = await supabase
      .from('my_client')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', data.id)
      .select()
      .single();

    if (error) throw error;

    // Update Redis
    await redis.del(this.getRedisKey(client.slug));
    await redis.set(this.getRedisKey(client.slug), JSON.stringify(client));

    return client;
  }

  static async delete(id: number): Promise<void> {
    // Soft delete in PostgreSQL
    const { data: client, error } = await supabase
      .from('my_client')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Remove from Redis
    await redis.del(this.getRedisKey(client.slug));
  }

  static async getBySlug(slug: string): Promise<Client | null> {
    // Try Redis first
    const cachedClient = await redis.get(this.getRedisKey(slug));
    if (cachedClient) return JSON.parse(cachedClient);

    // Fallback to PostgreSQL
    const { data: client, error } = await supabase
      .from('my_client')
      .select()
      .eq('slug', slug)
      .is('deleted_at', null)
      .single();

    if (error) return null;

    // Cache in Redis
    await redis.set(this.getRedisKey(slug), JSON.stringify(client));

    return client;
  }

  static async getAll(): Promise<Client[]> {
    const { data: clients, error } = await supabase
      .from('my_client')
      .select()
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return clients;
  }

  static async uploadLogo(file: File): Promise<string> {
    const { data, error } = await supabase.storage
      .from('client-logos')
      .upload(`${Date.now()}-${file.name}`, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('client-logos')
      .getPublicUrl(data.path);

    return publicUrl;
  }
}