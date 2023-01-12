// import { Inter } from '@next/font/google';
// const inter = Inter({ subsets: ['latin'] });

import { Htag, Button } from '../components';

export default function Home():JSX.Element {
  return (
    <>
      <Htag tag='h1'>Текст</Htag>
      <Button appearance='primary' arrow='right'>Кнопка</Button>
      <Button appearance='ghost' arrow='down'>Кнопка</Button> 
    </>
  );
}

