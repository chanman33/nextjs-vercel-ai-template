# Prisma Schema Management with Supabase Client

## Overview

This document outlines our approach to database management using Prisma for schema definition and migrations while using the Supabase client for all database operations. This hybrid approach leverages the strengths of both tools:

- **Prisma**: Excellent schema definition, migration management, and version control
- **Supabase**: Rich client features including real-time subscriptions, auth integration, and storage

## Why This Approach?

### Benefits

1. **Clear Schema Definition**: Prisma provides a clear, type-safe way to define your database schema
2. **Migration Management**: Prisma's migration system helps track and apply schema changes
3. **Supabase Features**: Access to Supabase's full feature set (auth, storage, real-time, etc.)
4. **Simplified Deployment**: Supabase handles hosting and scaling of the PostgreSQL database

### Considerations

1. **Manual Type Synchronization**: Types must be manually kept in sync with the schema
2. **Learning Curve**: Team members need to understand both Prisma schema syntax and Supabase client API
3. **Limited Prisma Features**: We don't use Prisma's query capabilities or relation handling

## Implementation Guide

### 1. Initial Setup

```bash
# Install dependencies
npm install -D prisma
npm install @supabase/supabase-js

# Initialize Prisma
npx prisma init
```

### 2. Configure Prisma for Supabase

Update your `prisma/schema.prisma` file:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Define your models here
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("users")
}
```

### 3. Set Up Environment Variables

```
# .env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-ID].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-ID].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
```

### 4. Create Supabase Client Utility

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 5. Define TypeScript Types

```typescript
// types/database.ts
export type User = {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
  updated_at: string;
};

// Add more types that match your Prisma schema
```

### 6. Database Operations with Supabase

```typescript
// Example: User service
import { supabase } from '@/lib/supabase';
import type { User } from '@/types/database';

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }
  
  return data as User;
}

export async function createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .insert([user])
    .select();
  
  if (error) {
    console.error('Error creating user:', error);
    return null;
  }
  
  return data[0] as User;
}
```

### 7. Making Schema Changes

When you need to update your database schema:

1. Modify the Prisma schema file
2. Run migration command:
   ```bash
   npx prisma migrate dev --name descriptive_name
   ```
3. Update your TypeScript types to match the new schema
4. Use the updated schema in your Supabase operations

## Best Practices

1. **Consistent Naming**: Use the same naming conventions in Prisma schema and TypeScript types
2. **Schema Comments**: Document your schema fields in the Prisma file
3. **Error Handling**: Always handle Supabase operation errors appropriately
4. **Type Safety**: Use TypeScript types consistently with Supabase operations
5. **Migration Testing**: Test migrations in development before applying to production

## Common Pitfalls to Avoid

1. **Generating Prisma Client**: Don't run `prisma generate` or use PrismaClient
2. **Direct Schema Edits**: Never modify the database schema directly; always use Prisma migrations
3. **Type Mismatches**: Ensure TypeScript types stay in sync with your actual database schema
4. **Exposing Credentials**: Keep database credentials secure and out of version control

## DB Access and RLS Policy

I run this, it's permissive, but the only person with the keys is me and my server, and I keep all actions server side (I hope):

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;

-- Grant basic read access to all tables for authenticated users
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated;

-- Grant ability to insert/update/delete for authenticated users
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;

-- Grant usage on all sequences (needed for ID columns)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Make sure new tables automatically inherit these same grants
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE ON SEQUENCES TO authenticated;

-- Grant read-only access to anon users (if needed)
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO anon;

-- Ensure service_role has full access
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


## Conclusion

This hybrid approach gives us the best of both worlds: Prisma's excellent schema management and Supabase's powerful client features. By following these guidelines, we can maintain a clean, type-safe database layer while leveraging the full capabilities of Supabase. 