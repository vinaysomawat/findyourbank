import get from 'lodash/get';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { find } from 'lodash';
import { Popconfirm } from 'antd';
import { Link } from 'react-router-dom';

export const allbanksColumn = ({
  removeFromFavorites,
  addToFavorites,
  userData,
}) => [
  {
    title: 'Bank',
    key: 'bank_name',
    render: (record) => (
      <Link to={`/bank-details/${get(record, 'ifsc')}`}>
        {get(record, 'bank_name')}
      </Link>
    ),
  },
  {
    title: 'IFSC',
    key: 'ifsc',
    render: (record) => <div>{get(record, 'ifsc')}</div>,
  },
  {
    title: 'Branch',
    key: 'branch',
    render: (record) => <div>{get(record, 'branch')}</div>,
  },
  {
    title: 'Bank ID',
    key: 'bank_id',
    render: (record) => <div>{get(record, 'bank_id')}</div>,
  },
  {
    title: 'Address',
    key: 'address',
    render: (record) => <div>{get(record, 'address')}</div>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (record) => {
      if (find(get(userData, 'favorites'), record)) {
        return (
          <Popconfirm
            title="Are you sure to remove the bank from favorites?"
            onConfirm={() => removeFromFavorites(get(record, 'ifsc'))}
            onCancel={() => null}
            okText="Yes"
            cancelText="No"
          >
            <HeartFilled className="icon_medium" />
          </Popconfirm>
        );
      } else {
        return (
          <HeartOutlined
            onClick={() => addToFavorites(record)}
            className="icon_medium"
          />
        );
      }
    },
  },
];
