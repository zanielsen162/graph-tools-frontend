'use client';
import { Button, Card } from '@/components/atoms/atoms';
import { Hero } from '@/components/molecules/molecules'
import { FaArrowRight, FaUser } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import test_graph_1 from '@/data/test-graph-1.json';
import GraphView from '@/components/organisms/GraphView';

export default function Home() {
  const router = useRouter();

  return (
    <div className='p-5 sans-serif flex flex-col gap-10 sm:gap-30'>
      <Hero
        title='Graph Tools'
        subtitle='An interactive web app for exploring and analyzing graph data.'
        interactive={
          <div className='flex flex-col sm:flex-row sm:gap-0 gap-2'>
            <Button
              buttonText={
                <div className='flex flex-row gap-2 justify-center items-center'>
                  <p className=''>Get Started</p>
                  <FaArrowRight />
                </div>
              }
              onClick={() => { router.push('/generate'); }}
              auto={true}
              level='primary'
              padding={true}
            />
            <Button
              buttonText={
                <div className='flex flex-row gap-2 items-center justify-center w-full'>
                  <p className=''>Sign Up</p>
                  <FaUser className='' />
                </div>
              }
              onClick={() => { router.push('/signup'); }}
              auto={true}
              level='secondary'
              padding={true}
            />
          </div>
        }
        display={
          <GraphView
            nodeEdgeJSON={test_graph_1}
            containerStyle='w-full flex-1 min-h-0'
          />
        }
      />

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <Card
          title='Generate'
          subtitle='Create custom graphs'
          body='Select properties and structures to create custom graphs.'
          button={<Button buttonText={<div className='flex flex-row gap-2 items-center justify-center'> <p className=''>Start Now</p> <FaArrowRight /> </div>} level='primary' onClick={() => { router.push('/generate'); }} />}
        />

        <Card
          title='Analyze'
          subtitle='Work with your graphs'
          body='Once you have generated your graphs, you can save notes and access them for later reference.'
          button={<Button buttonText={<div className='flex flex-row gap-2 items-center justify-center'> <p className=''>Sign Up to Start</p> <FaUser /> </div>} level='primary' onClick={() => { router.push('/signup'); }} />}
        />

        <Card
          title='Share'
          subtitle='Check out work from other users'
          body='As you create graphs, you can share them for other users to view or get inspiration from the community.'
          button={<Button buttonText={<div className='flex flex-row gap-2 items-center justify-center'> <p className=''>Check it Out</p> <IoShareSocialSharp /> </div>} level='primary' onClick={() => { router.push('/shared'); }} />}
        />
      </div>
    </div>
  );
}
