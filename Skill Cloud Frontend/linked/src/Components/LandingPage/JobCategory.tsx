import { Carousel } from '@mantine/carousel';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { jobCategory } from '../../Data/Data';

const JobCategory = () => {
  return (
    <div className='mt-20 pb-5'>
      <div className='text-4xl text-center font-semibold mb-3 text-mine-shaft-100'>
        Browse <span className='text-kashmir-blue-400'>Job </span>
        Category
      </div>
      <div className='text-lg mb-10 mx-auto text-mine-shaft-300 text-center w-1/2'>
        Explore diverse job opportunities tailored to your skills. Start your
        career today!
      </div>
      <Carousel slideSize='22%' slideGap='md' loop className='focus-visible:[&_button]:!outline-none
      [&_button]:!bg-kashmir-blue-400 [&_button]:!border-none [&_button]:hover:opacity-75 [&_button]:opacity-0
      hover:[&_button]:opacity-100'
      nextControlIcon={<IconArrowRight className="h-8 w-8"/>}
      previousControlIcon={<IconArrowLeft className="h-8 w-8"/>}
      >
        {jobCategory.map((category) => (
          <Carousel.Slide>
            <div className='flex flex-col items-center w-64 gap-2 border border-kashmir-blue-400 p-5 rounded-xl 
              hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] my-5 transition duration-300 ease-in-out !shadow-kashmir-blue-300'>
              <div className='p-2 bg-kashmir-blue-300 rounded-full'>
                <img
                  className='h-8 w-8'
                  src={`/Category/${category.name}.png`}
                  alt={category.name}
                />
              </div>
              <div className='text-kashmir-blue-100 text-xl font-semibold'>
                {category.name}
              </div>
              <div className='text-sm text-center text-mine-shaft-300'>
                {category.description}
              </div>
              <div className='text-kashmir-blue-300 text-lg'>
                {category.jobsPosted}+ New Jobs Posted
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default JobCategory;
