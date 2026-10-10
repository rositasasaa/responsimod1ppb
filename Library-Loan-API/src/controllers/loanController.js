import { LoanModel } from '../models/loanModel.js';

const VALID_STATUS = ['Dipinjam', 'Dikembalikan', 'Terlambat'];

function validateLoanInput(body, { partial = false } = {}) {
  const { member_name, book_title, borrow_date, due_date, status } = body;
  const errors = [];

  if (!partial || member_name !== undefined) {
    if (!member_name || typeof member_name !== 'string') errors.push('member_name wajib diisi (text)');
  }
  if (!partial || book_title !== undefined) {
    if (!book_title || typeof book_title !== 'string') errors.push('book_title wajib diisi (text)');
  }
  if (!partial || borrow_date !== undefined) {
    if (!borrow_date) errors.push('borrow_date wajib diisi (date)');
  }
  if (!partial || due_date !== undefined) {
    if (!due_date) errors.push('due_date wajib diisi (date)');
  }
  if (status !== undefined && !VALID_STATUS.includes(status)) {
    errors.push(`status harus salah satu dari: ${VALID_STATUS.join(', ')}`);
  }

  return errors;
}

export const LoanController = {
  async getAllLoans(req, res) {
    try {
      const loans = await LoanModel.getAll();
      res.status(200).json({ success: true, data: loans });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getLoanById(req, res) {
    try {
      const loan = await LoanModel.getById(req.params.id);
      if (!loan) {
        return res.status(404).json({ success: false, message: 'Data peminjaman tidak ditemukan' });
      }
      res.status(200).json({ success: true, data: loan });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async createLoan(req, res) {
    try {
      const errors = validateLoanInput(req.body);
      if (errors.length > 0) {
        return res.status(400).json({ success: false, message: 'Validasi gagal', errors });
      }

      const { member_name, book_title, borrow_date, due_date, status } = req.body;
      const newLoan = await LoanModel.create({
        member_name,
        book_title,
        borrow_date,
        due_date,
        status: status || 'Dipinjam',
      });

      res.status(201).json({ success: true, data: newLoan });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async updateLoan(req, res) {
    try {
      const errors = validateLoanInput(req.body, { partial: true });
      if (errors.length > 0) {
        return res.status(400).json({ success: false, message: 'Validasi gagal', errors });
      }

      const existing = await LoanModel.getById(req.params.id);
      if (!existing) {
        return res.status(404).json({ success: false, message: 'Data peminjaman tidak ditemukan' });
      }

      const updated = await LoanModel.update(req.params.id, req.body);
      res.status(200).json({ success: true, data: updated });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async deleteLoan(req, res) {
    try {
      const existing = await LoanModel.getById(req.params.id);
      if (!existing) {
        return res.status(404).json({ success: false, message: 'Data peminjaman tidak ditemukan' });
      }

      await LoanModel.remove(req.params.id);
      res.status(200).json({ success: true, message: 'Data peminjaman berhasil dihapus' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};
