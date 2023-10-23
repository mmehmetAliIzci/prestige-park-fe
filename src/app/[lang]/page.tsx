import { getDictionary } from "../get-dictionary";
import { Locale } from "../i18n-config";
import { Button } from "@components/atoms/button";
import SearchInput from "@components/molecules/searchInput/searchInput";
import { Suspense } from "react";

async function getDistricts(): Promise<District[]> {
  try {
    const res = await fetch(`http://localhost:3000/api/district`);
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  const districts = await getDistricts();

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-transparent to-transparent pb-12 pt-28 sm:pb-16 sm:pt-32 lg:pb-24 xl:pb-32 xl:pt-40">
        <div className="relative isolate z-10">
          <div className="absolute -z-10 flex -translate-y-1/2 justify-center overflow-hidden inset-x-0 top-1/2 [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
            <svg
              className="h-[60rem] w-[100rem] flex-none stroke-blue-600 opacity-20"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
                  width="200"
                  height="200"
                  x="50%"
                  y="50%"
                  patternUnits="userSpaceOnUse"
                  patternTransform="translate(-100 0)"
                >
                  <path d="M.5 200V.5H200" fill="none"></path>
                </pattern>
              </defs>
              <svg x="50%" y="50%" className="overflow-visible fill-blue-50">
                <path
                  d="M-300 0h201v201h-201Z M300 200h201v201h-201Z"
                  strokeWidth="0"
                ></path>
              </svg>
              <rect
                width="100%"
                height="100%"
                strokeWidth="0"
                fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)"
              ></rect>
            </svg>
          </div>
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900 ">
              <span className="text-[#20B2AA]">Prestige </span>Parking <br />
              for providing better user experiences
            </h2>

            <div className="mt-10">
              <Suspense fallback={<div>Loading</div>}>
                <SearchInput
                  dictionary={dictionary["search_input"]}
                  districts={districts}
                />
              </Suspense>
            </div>
            <h3 className="text-lg leading-8 text-gray-600 mt-6">
              Instantly respond to queries from visitors using a chatbot that
              has been trained on the information on your website.
            </h3>
          </div>
        </div>
      </section>
      <section className="bg-white py-10 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-3">
          <div className="max-w-2xl mx-auto lg:text-center">
            <p className="text-base font-semibold leading-7 text-[#20B2AA]">
              Your Own AI Chatbot
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-2 sm:text-4xl">
              The Future of Conversational AI
            </h2>
            <p className="text-lg leading-8 text-gray-600 mt-6">
              Developing a personalized chatbot trained on your content <br />{" "}
              is now as simple as pressing a single button.
            </p>
          </div>
          <div className="max-w-2xl mx-auto mt-10 lg:max-w-none lg:pt-24">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <h3 className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <svg
                    className="h-5 w-5 flex-none text-[#20B2AA]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Enter your website URL
                </h3>
                <dd className="flex flex-auto flex-col text-base leading-7 text-gray-600 mt-4">
                  <h4 className="flex-auto">
                    Our automated system will seamlessly retrieve all pages from
                    your website and present them for your review effortlessly.{" "}
                  </h4>
                </dd>
              </div>
              <div className="flex flex-col">
                <h3 className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <svg
                    className="h-5 w-5 flex-none text-[#20B2AA]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Start Training
                </h3>
                <dd className="flex flex-auto flex-col text-base leading-7 text-gray-600 mt-4">
                  <h4 className="flex-auto">
                    Select the pages you want the chatbot to train on and click
                    on <strong>Start Training.</strong>
                  </h4>
                </dd>
              </div>
              <div className="flex flex-col">
                <h3 className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <svg
                    className="h-5 w-5 flex-none text-[#20B2AA]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Your own chatbot
                </h3>
                <dd className="flex flex-auto flex-col text-base leading-7 text-gray-600 mt-4">
                  <h4 className="flex-auto">
                    You now have your own chatbot that can answer anything
                    related to your website content.
                  </h4>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-white px-6 py-10 md:py-24 text-center sm:shadow-sm sm:rounded-3xl sm:border sm:border-gray-100 sm:px-16">
            <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-gray-900 mx-auto sm:text-4xl">
              Ready to elevate your website&apos;s performance and impact
              <br /> to new heights?
            </h2>
            <h3 className="max-w-xl text-lg leading-8 text-gray-500 mx-auto mt-6">
              Unlock the potential of your website by harnessing the power of an
              AI-driven chatbot. Enhance user experience, engage visitors with
              personalized interactions, and achieve unprecedented levels of
              efficiency and customer satisfaction.
            </h3>
            <div className="flex items-center justify-center gap-x-6 mt-8">
              <Button className="px-4 py-3">
                {"Try Now"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
            </div>
            <svg
              viewBox="0 0 1024 1024"
              className="absolute -z-10 h-[64rem] w-[64rem] -translate-x-1/2 left-1/2 top-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle
                cx="512"
                cy="512"
                r="512"
                fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                fillOpacity="0.7"
              ></circle>
              <defs>
                <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                  <stop stopColor="#3b82f6"></stop>
                  <stop offset="1" stopColor="#1d4ed8"></stop>
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
