import { Table } from 'antd';
import { allbanksColumn } from '../../constants/table/allbanksColumn';
import get from 'lodash/get';
import { useMyContext } from '../../utility/contextProvider/myContext';

const FavoriteBanks = () => {
  const { userData, removeFromFavorites } = useMyContext();

  return (
    <>
      <div className="screen-title">Favorites</div>
      <Table
        columns={allbanksColumn({
          removeFromFavorites,
          userData,
        })}
        dataSource={get(userData, 'favorites')}
      />
    </>
  );
};
export default FavoriteBanks;
