// import { Inter } from '@next/font/google';
// const inter = Inter({ subsets: ['latin'] });

import { GetStaticProps } from 'next';
import { useState } from 'react';
import { Htag, Button, P, Tag, Rating } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';  
import { MenuItem } from '../interfaces/menu.interface';

   
function Home({menu}):JSX.Element {
  const [rating, setRating] = useState<number>(4);
  
  return (
    <>
      <Htag tag='h1'>Текст</Htag>
      <Button appearance='primary' arrow='right'>Кнопка</Button>
      <Button appearance='ghost' arrow='down'>Кнопка</Button> 
      <P size='s'>Маленький параграф</P>
      <P>Средний параграф</P>
      <P size='l'>Большой параграф</P>
      <Tag size='s'>Мал</Tag>
      <Tag size='m'>Ghost</Tag>
      <Tag size='s' color='red'>Red</Tag>
      <Tag size='m' color='green'>Green</Tag>
      <Tag color='primary'>Primary</Tag>
      <Rating isEditable rating={rating} setRating={setRating} /> 
      <ul>
        {menu.map(m=>(<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))};
      </ul>
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory
  });
    
  return {
    props: {
      menu,
      firstCategory
      }
    };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
