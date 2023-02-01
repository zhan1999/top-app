// import { Inter } from '@next/font/google';
// const inter = Inter({ subsets: ['latin'] });

import { GetStaticProps } from 'next';
import { withLayout } from '../layout/Layout';
import axios from 'axios';  
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}

function Search():JSX.Element {
  
  return (
		<>
		Search
		</>
  );
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory
  });
    
  return {
    props: {
      menu,
      firstCategory
      }
    };
};
