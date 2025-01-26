import Link from "next/link";
import Image from "next/image";

import {
  CheckIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const CartItem = () => {
  return (
    <li className="border-b border-gray-200 last:border-none py-6 flex">
      <div className="relative shrink-0 w-24 h-24 rounded-md sm:w-40 sm:h-40 p-4 bg-white">
        <Image
          className="w-full h-full object-cover"
          width={96}
          height={96}
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/thumbnail_a2_114b7a21f0.png`}
          alt="profuct_item_in_cart"
        />
        <span className="absolute inset-0 bg-gray-400/5"></span>
      </div>
      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="space-y-1">
            <div className="flex justify-between">
              <h3 className="text-sm font-medium">
                <Link href={"/"} className="text-gray-700">
                  Hisense AMS-09UR4SVEDB65
                </Link>
              </h3>
            </div>
            <div className="text-sm flex ">
              <p className="text-gray-500">Hisense</p>
              <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                Сплит системы
              </p>
            </div>
            <div className="text-sm font-medium text-gray-900">
              {new Intl.NumberFormat("ru").format(15000)} р.
            </div>
          </div>
          <div className="mt-4 sm:mt-0 sm:pr-9">
            <div className="grid w-full max-w-16 grid-cols-1">
              <select
                className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 sm:text-sm"
                name=""
                id=""
              >
                {new Array(10).fill("").map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className=" pointer-events-none col-start-1 row-start-1 mr-2 w-5 h-5 self-center justify-self-end text-gray-500 sm:w-4 sm:h-4" />
            </div>
            <div className="absolute top-0 right-0 ">
              <button
                type="button"
                className="-m-2 inline-flex p-2 text-gray-400"
              >
                <span className="sr-only">Удалить</span>
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <p className="flex mt-4 text-sm text-gray-700">
          <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-sm text-gray-700">В наличии</span>
        </p>
      </div>
    </li>
  );
};

export default CartItem;
