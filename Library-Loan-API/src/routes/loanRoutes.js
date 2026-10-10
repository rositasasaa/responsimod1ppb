import { Router } from 'express';
import { LoanController } from '../controllers/loanController.js';

const router = Router();

router.get('/', LoanController.getAllLoans);
router.get('/:id', LoanController.getLoanById);
router.post('/', LoanController.createLoan);
router.put('/:id', LoanController.updateLoan);
router.delete('/:id', LoanController.deleteLoan);

export default router;
