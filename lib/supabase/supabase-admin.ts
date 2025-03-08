import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/utils/types/database.types';

// This client should ONLY be used in server-side contexts (API routes, Server Components, etc.)
// NEVER expose this client or the service role key to the client-side

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey
); 