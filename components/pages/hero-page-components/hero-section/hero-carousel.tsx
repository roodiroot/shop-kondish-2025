import Image from "next/image";
// import Autoplay from "embla-carousel-autoplay";

// import { Button } from "@/components/ui/button";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
import { HeroScreens } from "@/data/hero-screen-api";
import { Icon } from "@/components/ui/icon";
import FButton from "@/components/general/fbutton";

interface HeroCarouselProps {
  heroScreens?: HeroScreens[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ heroScreens }) => {
  if (!heroScreens?.length) {
    return (
      <div className="py-4">
        <div className="relative shadow-sm  overflow-hidden w-full aspect-[2/2] sm:aspect-[2/1] lg:aspect-[3.3/1] bg-gray-100 rounded-lg">
          <div className="absolute inset-0 z-10 flex flex-col sm:justify-center items-center p-4">
            <div className="w-full max-w-4xl">
              <Icon.logo width={130} />
              <div className="mt-4">
                <div className="p-3 bg-black max-w-md">
                  <h1 className=" uppercase font-thin text-xl sm:text-2xl text-[#FB4C01]">
                    Устанавливаем и продаем кондиционеры.
                  </h1>
                </div>
                <span className="block uppercase text-white font-semibold mt-1 text-sm">
                  в москве и Области с 2010 года
                </span>
              </div>
              <div className="mt-4">
                <FButton className="border-2 border-black py-3 px-7 text-xs uppercase font-semibold hover:bg-black hover:text-[#FB4C01] transition-colors">
                  Заказать установку
                </FButton>
              </div>
            </div>
          </div>
          <Image
            width={1216}
            height={369}
            priority
            src={"/images/main_hero_page.jpg"}
            alt={"command_kondish"}
            className="absolute w-full h-full object-cover z-0"
          />
        </div>
      </div>
    );
  }
  // return (
  //   <div className="py-4">
  //     <Carousel
  //       opts={{ loop: true }}
  //       plugins={[Autoplay({ delay: 5000 })]}
  //       className="w-full"
  //     >
  //       <CarouselContent>
  //         {heroScreens.map((screen) => (
  //           <CarouselItem key={screen.documentId}>
  //             <div className="p-1">
  //               <div className="relative shadow-md overflow-hidden w-full aspect-[1.5/2] sm:aspect-[2/1] lg:aspect-[2.4/1] bg-gray-100 rounded-lg">
  //                 <Image
  //                   width={1200}
  //                   height={1200}
  //                   src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${screen?.image?.url}`}
  //                   alt={"command_kondish"}
  //                   className="absolute w-full h-full object-cover"
  //                 />
  //                 {screen?.title ? (
  //                   <div className="absolute inset-0 p-10 ">
  //                     <div className="max-w-xl space-y-4 mt-10">
  //                       <div className="">{screen?.subtitle}</div>
  //                       <div className="text-2xl sm:text-3xl font-bold">
  //                         {screen?.title}
  //                       </div>
  //                       <p>{screen?.description}</p>
  //                       <Button>{screen?.buttonText}</Button>
  //                     </div>
  //                   </div>
  //                 ) : null}
  //               </div>
  //             </div>
  //           </CarouselItem>
  //         ))}
  //       </CarouselContent>
  //       {heroScreens?.length > 1 ? (
  //         <>
  //           <CarouselPrevious className="left-0" />
  //           <CarouselNext className="right-0" />
  //         </>
  //       ) : null}
  //     </Carousel>
  //   </div>
  // );
};

export default HeroCarousel;
