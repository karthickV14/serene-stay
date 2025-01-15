import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://blptnzjicpckmgimvmym.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJscHRuemppY3Bja21naW12bXltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjYzMDUsImV4cCI6MjA1MjM0MjMwNX0.sQGaHCwW1rT0AgxpF7CSLK8EHVqaziA9afewzzUJ5aA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
