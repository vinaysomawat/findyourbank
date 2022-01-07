import 'antd/dist/antd.css';
import { Layout } from 'antd';
import './App.scss';
import Sidebar from './components/Sidebar/Sidebar';
import AppRouter from './AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { MyProvider } from '../src/utility/contextProvider/myContext';
const { Content } = Layout;

function App() {
  return (
    <MyProvider>
      <div className="App">
        <BrowserRouter>
          <Layout>
            <Sidebar />
            <Layout>
              <Content className="main-content">
                <AppRouter />
              </Content>
            </Layout>
          </Layout>
        </BrowserRouter>
      </div>
    </MyProvider>
  );
}

export default App;
