import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import MenuKeys from '../../constants/menu';
import map from 'lodash/map';
import get from 'lodash/get';
import './style.scss';
import { getLeftPanelKey } from '../../constants/routes';

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();

  return (
    <Sider>
      <div className="logo">
        <h4 className='font-weight-bold p-3 text-white'>FindYourBank</h4>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[getLeftPanelKey(get(location, 'pathname'))]}
      >
        {map(MenuKeys, (m, i) => {
          return (
            <Menu.Item key={`${i}`}>
              <Link to={get(m, 'route')}>{get(m, 'name')}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
