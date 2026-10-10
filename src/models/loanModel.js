import { supabase } from '../config/supabaseClient.js';

const TABLE = 'loans';

export const LoanModel = {
  async getAll() {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('borrow_date', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async create(loan) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(loan)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, loan) {
    const { data, error } = await supabase
      .from(TABLE)
      .update(loan)
      .eq('id', id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { data, error } = await supabase
      .from(TABLE)
      .delete()
      .eq('id', id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return data;
  },
};
