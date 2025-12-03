// lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase = null;

// Nếu chưa cấu hình biến môi trường trên Vercel
// thì KHÔNG tạo client để tránh lỗi khi build.
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Supabase env missing: NEXT_PUBLIC_SUPABASE_URL hoặc NEXT_PUBLIC_SUPABASE_ANON_KEY chưa được cấu hình. Đang chạy chế độ mock data."
  );
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
