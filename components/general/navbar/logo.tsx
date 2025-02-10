import { cn } from "@/lib/utils";
import Link from "next/link";

const Logo: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  return (
    <div className={cn("flex h-9", className)}>
      <Link href="/">
        <span className="sr-only">Kondish</span>
        <svg
          className="h-full"
          viewBox="0 0 125 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="125" height="40" rx="6" fill="#F97316" />
          <path
            d="M9 11.2299H15.0145V16.0142L18.4318 11.2299H24.9475L19.8215 17.9962L25.1753 27.1774H18.4318L15.7663 22.1426L15.0145 23.0539V27.1774H9V11.2299Z"
            fill="white"
          />
          <path
            d="M32.3482 27.5192C31.2242 27.5192 30.1611 27.3597 29.1587 27.0407C28.1714 26.7218 27.3057 26.2358 26.5615 25.5827C25.8173 24.9144 25.2249 24.0639 24.7845 23.0311C24.3592 21.9983 24.1466 20.7605 24.1466 19.3176V18.8619C24.1466 17.495 24.3592 16.3179 24.7845 15.3307C25.2249 14.3283 25.8173 13.5005 26.5615 12.8475C27.3057 12.1792 28.1714 11.6856 29.1587 11.3666C30.1611 11.0477 31.2242 10.8882 32.3482 10.8882C33.4721 10.8882 34.5277 11.0477 35.5149 11.3666C36.5173 11.6856 37.3906 12.1792 38.1348 12.8475C38.8791 13.5005 39.4638 14.3283 39.8891 15.3307C40.3295 16.3179 40.5497 17.495 40.5497 18.8619V19.3176C40.5497 20.7301 40.3295 21.9527 39.8891 22.9855C39.4638 24.0183 38.8791 24.8764 38.1348 25.5599C37.3906 26.2282 36.5173 26.7218 35.5149 27.0407C34.5277 27.3597 33.4721 27.5192 32.3482 27.5192ZM32.3482 22.6438C32.9861 22.6438 33.4873 22.3932 33.8518 21.892C34.2163 21.3756 34.3986 20.5174 34.3986 19.3176V18.8619C34.3986 17.7684 34.2163 16.9786 33.8518 16.4926C33.4873 16.0066 32.9861 15.7636 32.3482 15.7636C31.7103 15.7636 31.2091 16.0066 30.8445 16.4926C30.48 16.9786 30.2978 17.7684 30.2978 18.8619V19.3176C30.2978 20.5174 30.48 21.3756 30.8445 21.892C31.2091 22.3932 31.7103 22.6438 32.3482 22.6438Z"
            fill="white"
          />
          <path
            d="M41.2279 11.2299H46.1033L51.1609 17.8367V11.2299H56.7197V27.1774H51.8444L46.7867 20.5706V27.1774H41.2279V11.2299Z"
            fill="white"
          />
          <path
            d="M57.8535 11.2299H65.0299C66.2298 11.2299 67.3081 11.397 68.265 11.7311C69.237 12.0501 70.0648 12.5285 70.7482 13.1664C71.4317 13.8043 71.9557 14.6017 72.3202 15.5585C72.6999 16.5154 72.8898 17.6165 72.8898 18.8619V19.3176C72.8898 20.5934 72.6999 21.7249 72.3202 22.7121C71.9405 23.6842 71.3937 24.5043 70.6799 25.1726C69.9812 25.8257 69.1307 26.3269 68.1283 26.6762C67.141 27.0104 66.0323 27.1774 64.8021 27.1774H57.8535V11.2299ZM64.8021 22.3476C65.0907 22.3476 65.3489 22.3021 65.5767 22.2109C65.8197 22.1198 66.0247 21.9603 66.1918 21.7325C66.3741 21.5047 66.5107 21.1933 66.6019 20.7984C66.693 20.4035 66.7386 19.9099 66.7386 19.3176V18.8619C66.7386 17.7836 66.5791 17.047 66.2601 16.6521C65.9412 16.2572 65.4552 16.0597 64.8021 16.0597H63.868V22.3476H64.8021Z"
            fill="white"
          />
          <path
            d="M73.6809 11.2299H79.6954V27.1774H73.6809V11.2299Z"
            fill="white"
          />
          <path
            d="M87.6581 27.5192C85.3799 27.5192 83.6333 27.1167 82.4182 26.3117C81.2032 25.4916 80.4817 24.1854 80.2539 22.3932H86.2684C86.314 22.7121 86.4355 22.9475 86.6329 23.0994C86.8304 23.2513 87.1721 23.3272 87.6581 23.3272C88.1897 23.3272 88.5542 23.2741 88.7517 23.1678C88.9491 23.0463 89.0478 22.864 89.0478 22.621C89.0478 22.4843 89.0099 22.3704 88.9339 22.2793C88.858 22.1881 88.7061 22.097 88.4783 22.0059C88.2656 21.9148 87.9543 21.8236 87.5442 21.7325C87.1493 21.6262 86.6177 21.5047 85.9495 21.368C85.19 21.2161 84.4914 21.0187 83.8535 20.7756C83.2156 20.5174 82.6612 20.1833 82.1904 19.7732C81.7196 19.3632 81.355 18.8619 81.0968 18.2696C80.8387 17.6621 80.7096 16.9482 80.7096 16.1281C80.7096 15.2472 80.8766 14.4802 81.2108 13.8271C81.5449 13.1588 82.0157 12.612 82.6233 12.1868C83.246 11.7463 83.9826 11.4198 84.8331 11.2071C85.6837 10.9945 86.6253 10.8882 87.6581 10.8882C89.83 10.8882 91.4931 11.3286 92.6474 12.2095C93.8017 13.0905 94.4928 14.2827 94.7206 15.7864H88.7061C88.6757 15.5737 88.577 15.4066 88.4099 15.2851C88.258 15.1484 88.0074 15.0801 87.6581 15.0801C87.0354 15.0801 86.724 15.3155 86.724 15.7864C86.724 15.923 86.762 16.0445 86.838 16.1509C86.9291 16.2572 87.0734 16.3559 87.2708 16.447C87.4683 16.523 87.7341 16.5989 88.0682 16.6749C88.4175 16.7508 88.8504 16.8343 89.3668 16.9255C90.0351 17.047 90.7033 17.214 91.3716 17.4267C92.0551 17.6241 92.6702 17.9127 93.217 18.2924C93.7637 18.6721 94.2042 19.1657 94.5383 19.7732C94.8877 20.3656 95.0623 21.1174 95.0623 22.0287C95.0623 22.9703 94.8877 23.7905 94.5383 24.4891C94.189 25.1726 93.6878 25.7422 93.0347 26.1978C92.3968 26.6383 91.6222 26.9648 90.7109 27.1774C89.7996 27.4053 88.782 27.5192 87.6581 27.5192Z"
            fill="white"
          />
          <path
            d="M95.5162 11.2299H101.531V16.6749H104.994V11.2299H111.008V27.1774H104.994V21.5047H101.531V27.1774H95.5162V11.2299Z"
            fill="white"
          />
          <path
            d="M33.5471 10.4923H31.4614L33.2263 7.92529H37.7186L33.5471 10.4923Z"
            fill="white"
          />
          <path
            d="M113.505 9.69576L113.497 7.47635L114.621 7.47208C114.712 7.47174 114.81 7.49743 114.916 7.54915C115.023 7.59887 115.113 7.67672 115.188 7.7827C115.265 7.88666 115.303 8.01884 115.304 8.17923C115.304 8.34163 115.266 8.48011 115.188 8.59469C115.11 8.70726 115.015 8.79283 114.903 8.85139C114.793 8.90995 114.689 8.93942 114.591 8.93979L113.779 8.94288L113.778 8.582L114.439 8.57949C114.505 8.57923 114.576 8.54588 114.652 8.47943C114.73 8.41297 114.769 8.31358 114.768 8.18126C114.768 8.04493 114.729 7.95285 114.65 7.90503C114.574 7.85721 114.507 7.8334 114.448 7.83362L113.985 7.83538L113.992 9.69391L113.505 9.69576ZM114.842 8.64412L115.4 9.68857L114.864 9.6906L114.319 8.6461L114.842 8.64412ZM114.352 11.0158C114.019 11.017 113.707 10.9561 113.416 10.8329C113.125 10.7097 112.869 10.5382 112.647 10.3185C112.426 10.0988 112.253 9.84387 112.127 9.55363C112.002 9.26339 111.938 8.95187 111.937 8.61906C111.936 8.28625 111.997 7.97425 112.12 7.68307C112.243 7.39189 112.415 7.13561 112.634 6.91424C112.854 6.69287 113.109 6.51947 113.399 6.39407C113.69 6.26866 114.001 6.20533 114.334 6.20406C114.667 6.2028 114.979 6.26377 115.27 6.38697C115.561 6.51017 115.817 6.68161 116.039 6.90131C116.26 7.12101 116.434 7.37598 116.559 7.66622C116.684 7.95646 116.748 8.26798 116.749 8.60079C116.75 8.9336 116.689 9.2456 116.566 9.53678C116.443 9.82796 116.271 10.0842 116.052 10.3056C115.832 10.527 115.577 10.7004 115.287 10.8258C114.997 10.9512 114.685 11.0145 114.352 11.0158ZM114.35 10.4384C114.687 10.4371 114.993 10.3537 115.269 10.1883C115.545 10.0228 115.765 9.80146 115.928 9.52416C116.092 9.24686 116.173 8.9398 116.172 8.60298C116.17 8.26616 116.087 7.95973 115.921 7.68368C115.756 7.40763 115.535 7.18793 115.257 7.02458C114.98 6.86123 114.673 6.78019 114.336 6.78147C113.999 6.78275 113.693 6.86611 113.417 7.03156C113.141 7.19701 112.921 7.41839 112.758 7.69569C112.594 7.97299 112.513 8.28005 112.515 8.61687C112.516 8.95369 112.599 9.26012 112.765 9.53617C112.93 9.81222 113.152 10.0319 113.429 10.1953C113.706 10.3586 114.013 10.4397 114.35 10.4384Z"
            fill="white"
          />
          <path
            d="M9.0498 29.0576H10.5281C10.7688 29.0576 10.9865 29.0881 11.1813 29.1492C11.3762 29.2065 11.5423 29.2944 11.6798 29.4128C11.8174 29.5312 11.9224 29.6764 11.995 29.8483C12.0714 30.0164 12.1096 30.2093 12.1096 30.427C12.1096 30.6447 12.0714 30.8396 11.995 31.0115C11.9224 31.1795 11.8174 31.3228 11.6798 31.4412C11.5423 31.5596 11.3762 31.6513 11.1813 31.7162C10.9865 31.7774 10.7688 31.8079 10.5281 31.8079H9.6801V32.9539H9.0498V29.0576ZM10.5568 31.2349C10.8318 31.2387 11.0534 31.1719 11.2214 31.0344C11.3933 30.893 11.4793 30.6906 11.4793 30.427C11.4793 30.1634 11.3933 29.9648 11.2214 29.8311C11.0534 29.6974 10.8318 29.6306 10.5568 29.6306H9.6801V31.2349H10.5568Z"
            fill="white"
          />
          <path
            d="M13.7459 32.9539L15.4076 29.0576H16.078L17.7454 32.9539H17.0406L16.6911 32.083H14.8002L14.4507 32.9539H13.7459ZM16.4733 31.51L15.7456 29.6821L15.0179 31.51H16.4733Z"
            fill="white"
          />
          <path
            d="M20.1544 32.9539V29.0576H22.5953V29.6306H20.7846V30.5932H21.5868C21.7931 30.5932 21.9746 30.6237 22.1312 30.6849C22.2916 30.7422 22.4253 30.8224 22.5323 30.9255C22.643 31.0287 22.7252 31.1528 22.7787 31.298C22.836 31.4393 22.8646 31.5959 22.8646 31.7678C22.8646 31.9397 22.836 32.0982 22.7787 32.2434C22.7252 32.3886 22.643 32.5146 22.5323 32.6216C22.4253 32.7247 22.2916 32.8068 22.1312 32.868C21.9707 32.9253 21.7874 32.9539 21.5811 32.9539H20.1544ZM21.4952 32.4096C21.7473 32.4096 21.9344 32.3484 22.0567 32.2262C22.1789 32.104 22.24 31.9512 22.24 31.7678C22.24 31.5883 22.1789 31.4393 22.0567 31.3209C21.9344 31.1986 21.7473 31.1375 21.4952 31.1375H20.7846V32.4096H21.4952Z"
            fill="white"
          />
          <path
            d="M25.2027 31.0057C25.2027 30.7078 25.2504 30.4366 25.3459 30.1921C25.4414 29.9476 25.577 29.7375 25.7527 29.5618C25.9323 29.3861 26.1462 29.2505 26.3945 29.155C26.6428 29.0595 26.9197 29.0117 27.2253 29.0117C27.5309 29.0117 27.8079 29.0595 28.0562 29.155C28.3045 29.2505 28.5165 29.3861 28.6922 29.5618C28.8717 29.7375 29.0092 29.9476 29.1047 30.1921C29.2002 30.4366 29.248 30.7078 29.248 31.0057C29.248 31.3037 29.2002 31.5749 29.1047 31.8194C29.0092 32.0639 28.8717 32.274 28.6922 32.4497C28.5165 32.6254 28.3045 32.761 28.0562 32.8565C27.8079 32.952 27.5309 32.9997 27.2253 32.9997C26.9197 32.9997 26.6428 32.952 26.3945 32.8565C26.1462 32.761 25.9323 32.6254 25.7527 32.4497C25.577 32.274 25.4414 32.0639 25.3459 31.8194C25.2504 31.5749 25.2027 31.3037 25.2027 31.0057ZM25.8387 31.0057C25.8387 31.2235 25.8692 31.4202 25.9304 31.5959C25.9953 31.7678 26.087 31.9168 26.2054 32.0428C26.3276 32.1651 26.4728 32.2587 26.6409 32.3236C26.8128 32.3886 27.0076 32.421 27.2253 32.421C27.4431 32.421 27.6379 32.3886 27.8098 32.3236C27.9817 32.2587 28.1268 32.1651 28.2453 32.0428C28.3675 31.9168 28.4592 31.7678 28.5203 31.5959C28.5852 31.4202 28.6177 31.2235 28.6177 31.0057C28.6177 30.788 28.5852 30.5932 28.5203 30.4213C28.4592 30.2456 28.3675 30.0966 28.2453 29.9743C28.1268 29.8483 27.9817 29.7528 27.8098 29.6878C27.6379 29.6229 27.4431 29.5904 27.2253 29.5904C27.0076 29.5904 26.8128 29.6229 26.6409 29.6878C26.4728 29.7528 26.3276 29.8483 26.2054 29.9743C26.087 30.0966 25.9953 30.2456 25.9304 30.4213C25.8692 30.5932 25.8387 30.788 25.8387 31.0057Z"
            fill="white"
          />
          <path
            d="M32.3716 29.6306H31.1568V29.0576H34.251V29.6306H33.0019V32.9539H32.3716V29.6306Z"
            fill="white"
          />
          <path
            d="M35.9801 32.9539L37.6417 29.0576H38.3121L39.9796 32.9539H39.2748L38.9252 32.083H37.0344L36.6849 32.9539H35.9801ZM38.7075 31.51L37.9798 29.6821L37.2521 31.51H38.7075Z"
            fill="white"
          />
          <path
            d="M42.3885 29.0576H45.3108V29.6306H43.0188V30.7192H45.3108V31.298H43.0188V32.3809H45.3108V32.9539H42.3885V29.0576Z"
            fill="white"
          />
          <path
            d="M50.2873 32.1804L51.6052 29.0576H52.2813L52.7741 32.9539L52.1151 32.9596L51.7943 30.1405L50.6082 32.9539H49.9664L48.7803 30.1462L48.4594 32.9596L47.8005 32.9539L48.2933 29.0576H48.9694L50.2873 32.1804Z"
            fill="white"
          />
          <path
            d="M60.9356 29.0576H61.5659V32.9539H60.9356V31.5214C60.8134 31.6246 60.6682 31.7067 60.5001 31.7678C60.332 31.8251 60.1468 31.8538 59.9443 31.8538C59.5432 31.8538 59.2453 31.7544 59.0504 31.5558C58.8556 31.3572 58.7582 31.0745 58.7582 30.7078V29.0576H59.3942V30.6734C59.3942 30.9026 59.4535 31.0745 59.5719 31.1891C59.6903 31.2999 59.8584 31.3553 60.0761 31.3553C60.2022 31.3553 60.3168 31.3381 60.4199 31.3037C60.5269 31.2655 60.6185 31.2139 60.6949 31.149C60.7713 31.084 60.8305 31.0076 60.8726 30.9198C60.9146 30.8319 60.9356 30.7364 60.9356 30.6333V29.0576Z"
            fill="white"
          />
          <path
            d="M64.3031 29.0576H67.2253V29.6306H64.9334V30.7192H67.2253V31.298H64.9334V32.3809H67.2253V32.9539H64.3031V29.0576Z"
            fill="white"
          />
          <path
            d="M72.9453 32.7591C72.8727 32.7935 72.7887 32.8259 72.6932 32.8565C72.6015 32.8871 72.5022 32.9138 72.3952 32.9367C72.2883 32.9558 72.1775 32.9711 72.0629 32.9826C71.9521 32.994 71.8413 32.9997 71.7305 32.9997C71.4135 32.9997 71.1251 32.9539 70.8653 32.8622C70.6094 32.7667 70.3897 32.633 70.2064 32.4611C70.023 32.2854 69.8817 32.0753 69.7824 31.8308C69.6831 31.5825 69.6334 31.3075 69.6334 31.0057C69.6334 30.7001 69.6831 30.4251 69.7824 30.1806C69.8855 29.9361 70.0288 29.728 70.2121 29.5561C70.3955 29.3803 70.617 29.2466 70.8768 29.155C71.1365 29.0595 71.4269 29.0117 71.7477 29.0117C71.9693 29.0117 72.1851 29.0346 72.3952 29.0805C72.6091 29.1225 72.7925 29.1798 72.9453 29.2524V29.8483C72.7963 29.7719 72.6206 29.7146 72.4181 29.6764C72.2195 29.6344 72.017 29.6134 71.8108 29.6134C71.5701 29.6134 71.3543 29.6458 71.1633 29.7108C70.9723 29.7719 70.8099 29.8636 70.6762 29.9858C70.5425 30.1042 70.4394 30.2494 70.3668 30.4213C70.2981 30.5894 70.2637 30.7823 70.2637 31C70.2637 31.4355 70.3974 31.7774 70.6648 32.0257C70.936 32.2701 71.3218 32.3924 71.8222 32.3924C72.04 32.3924 72.2462 32.3733 72.4411 32.3351C72.6359 32.2931 72.804 32.2338 72.9453 32.1574V32.7591Z"
            fill="white"
          />
          <path
            d="M76.6268 29.6306H75.4121V29.0576H78.5062V29.6306H77.2571V32.9539H76.6268V29.6306Z"
            fill="white"
          />
          <path
            d="M81.0006 29.0576H81.6309V30.7192H83.8083V29.0576H84.4386V32.9539H83.8083V31.298H81.6309V32.9539H81.0006V29.0576Z"
            fill="white"
          />
          <path
            d="M86.8887 31.0057C86.8887 30.7078 86.9365 30.4366 87.032 30.1921C87.1275 29.9476 87.2631 29.7375 87.4388 29.5618C87.6183 29.3861 87.8323 29.2505 88.0806 29.155C88.3288 29.0595 88.6058 29.0117 88.9114 29.0117C89.217 29.0117 89.4939 29.0595 89.7422 29.155C89.9905 29.2505 90.2025 29.3861 90.3783 29.5618C90.5578 29.7375 90.6953 29.9476 90.7908 30.1921C90.8863 30.4366 90.9341 30.7078 90.9341 31.0057C90.9341 31.3037 90.8863 31.5749 90.7908 31.8194C90.6953 32.0639 90.5578 32.274 90.3783 32.4497C90.2025 32.6254 89.9905 32.761 89.7422 32.8565C89.4939 32.952 89.217 32.9997 88.9114 32.9997C88.6058 32.9997 88.3288 32.952 88.0806 32.8565C87.8323 32.761 87.6183 32.6254 87.4388 32.4497C87.2631 32.274 87.1275 32.0639 87.032 31.8194C86.9365 31.5749 86.8887 31.3037 86.8887 31.0057ZM87.5247 31.0057C87.5247 31.2235 87.5553 31.4202 87.6164 31.5959C87.6814 31.7678 87.773 31.9168 87.8915 32.0428C88.0137 32.1651 88.1589 32.2587 88.3269 32.3236C88.4988 32.3886 88.6937 32.421 88.9114 32.421C89.1291 32.421 89.3239 32.3886 89.4958 32.3236C89.6677 32.2587 89.8129 32.1651 89.9313 32.0428C90.0536 31.9168 90.1452 31.7678 90.2064 31.5959C90.2713 31.4202 90.3038 31.2235 90.3038 31.0057C90.3038 30.788 90.2713 30.5932 90.2064 30.4213C90.1452 30.2456 90.0536 30.0966 89.9313 29.9743C89.8129 29.8483 89.6677 29.7528 89.4958 29.6878C89.3239 29.6229 89.1291 29.5904 88.9114 29.5904C88.6937 29.5904 88.4988 29.6229 88.3269 29.6878C88.1589 29.7528 88.0137 29.8483 87.8915 29.9743C87.773 30.0966 87.6814 30.2456 87.6164 30.4213C87.5553 30.5932 87.5247 30.788 87.5247 31.0057Z"
            fill="white"
          />
        </svg>
      </Link>
    </div>
  );
};

export default Logo;
