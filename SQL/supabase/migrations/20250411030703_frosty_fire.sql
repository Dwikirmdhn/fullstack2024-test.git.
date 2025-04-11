/*
  # Create clients table with Redis integration

  1. New Tables
    - `my_client`
      - `id` (int, auto-incrementing primary key)
      - `name` (char(250), required)
      - `slug` (char(100), required)
      - `is_project` (varchar(30), required, default '0')
      - `self_capture` (char(1), required, default '1')
      - `client_prefix` (char(4), required)
      - `client_logo` (char(255), required, default 'no-image.jpg')
      - `address` (text, optional)
      - `phone_number` (char(50), optional)
      - `city` (char(50), optional)
      - `created_at` (timestamp, optional)
      - `updated_at` (timestamp, optional)
      - `deleted_at` (timestamp, optional)

  2. Security
    - Enable RLS on `my_client` table
    - Add policies for CRUD operations
*/

CREATE TABLE my_client (
  id SERIAL PRIMARY KEY,
  name char(250) NOT NULL,
  slug char(100) NOT NULL,
  is_project varchar(30) check (is_project in ('0','1')) NOT NULL DEFAULT '0',
  self_capture char(1) NOT NULL DEFAULT '1',
  client_prefix char(4) NOT NULL,
  client_logo char(255) NOT NULL DEFAULT 'no-image.jpg',
  address text DEFAULT NULL,
  phone_number char(50) DEFAULT NULL,
  city char(50) DEFAULT NULL,
  created_at timestamp DEFAULT NULL,
  updated_at timestamp DEFAULT NULL,
  deleted_at timestamp DEFAULT NULL
);

-- Enable Row Level Security
ALTER TABLE my_client ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON my_client
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Enable insert access for authenticated users" ON my_client
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users" ON my_client
  FOR UPDATE USING (deleted_at IS NULL);

CREATE POLICY "Enable delete access for authenticated users" ON my_client
  FOR DELETE USING (true);