import * as ROUTES from '../src/constants/routes';
import { Navigate, Route, Routes } from 'react-router-dom';
import AllBanks from './components/AllBanks/AllBanks';
import FavoriteBanks from './components/FavoriteBanks/FavoriteBanks';
import BankDetails from './components/BankDetails/BankDetails';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AllBanks />} />
      <Route path={ROUTES.ALL_BANKS} element={<AllBanks />} />
      <Route path={ROUTES.FAVORITES} element={<FavoriteBanks />} />
      <Route path={ROUTES.BANK_DETAILS} element={<BankDetails />} />
      <Route path="*" element={<Navigate to="/all-banks" />} />
    </Routes>
  );
};

export default AppRouter;
