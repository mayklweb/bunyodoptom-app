import { useEffect, useRef, useState } from "react";
import ProfileField from "../ProfileField";
import { useLogout, useProfile } from "../../../auth/hooks/useAuthUser";

function PersonalInfo({}) {
  const [fields, setFields] = useState({
    name: null,
    phone: null,
  });

  const { data: user } = useProfile();

  console.log(user);

  const logout = useLogout();
  const [draft, setDraft] = useState({ ...user });
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const inputRefs = useRef({});

  useEffect(() => {
    if (editing) inputRefs.current[editing]?.focus();
  }, [editing]);

  const handleSave = (key) => {
    setSaving(true);
    // Replace this setTimeout with your real API call (e.g. updateMe)
    setTimeout(() => {
      setFields((prev) => ({ ...prev, [key]: draft[key] }));
      setEditing(null);
      setSaving(false);
    }, 600);
  };

  const handleCancel = (key) => {
    setDraft((prev) => ({ ...prev, [key]: user[key] }));
    setEditing(null);
  };

  const fieldConfig = [
    { key: "name", label: "Ism familiya", disabled: false },
    { key: "phone", label: "Telefon raqam", disabled: false },
    { key: "id", label: "Foydalanuvchi ID", disabled: true },
  ];

  return (
    <div className="flex flex-col gap-2.5">
      <div className=" flex grow flex-col gap-[24px] overflow-y-auto">
       
        <div className="mt-[8px] flex justify-center">
          <div className="relative w-[72px] h-[72px]">
            <img
              alt="user"
              loading="lazy"
              width="72"
              height="72"
              decoding="async"
              data-nimg="1"
              src="https://jmmobile.uz/_next/image?url=%2Fplaceholder-user.webp&amp;w=256&amp;q=75"
              className="w-[72px] h-[72px] text-transparent visible object-cover"
            />
          </div>
        </div>
        <div>
          <label
            data-slot="form-label"
            className="text-md data-[error=true]:text-red mb-[6px] flex items-center gap-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 first-letter:uppercase"
            for="firstname"
            data-error="false"
          >
            Ism va familiya
          </label>
          <div className="relative w-full">
            <input
              id="firstname"
              className="bg-gray flex h-[36px] w-full min-w-0 rounded-[12px] px-[12px] py-[10px] caret-primary invalid:border-red placeholder:text-md invalid:!caret-red invalid:!text-red focus:caret-primary focus:border-primary focus:outline-primary focus:invalid:border-red focus:invalid:outline-red placeholder:font-medium focus:outline disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none"
              placeholder="Ismingizni kiriting"
              data-slot="input"
              type="text"
              value="Muhammad"
              name="firstname"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[6px]">
          <label
            data-slot="label"
            className="text-md data-[error=true]:text-red mb-[6px] flex items-center gap-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 first-letter:uppercase"
          >
            Telefon raqami
          </label>
          <div className=" input:w-full border-red flex w-full rounded-[12px] bg-gray">
            <div className="bg-gray">
              <button
                title="Uzbekistan"
                role="combobox"
                aria-label="Country selector"
                aria-haspopup="listbox"
                aria-expanded="false"
                type="button"
                className=""
                data-country="uz"
              >
                <div className="">
                  <img
                    className=""
                    draggable="false"
                    data-country="uz"
                    loading="lazy"
                    alt=""
                    src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1fa-1f1ff.svg"
                  />
                  <div className="button__dropdown-arrow"></div>
                </div>
              </button>
            </div>

            <input
              className="outline-none w-full rounded-r-[12px]"
              type="tel"
              value="+998 77 061 84 82"
              name="phone"
            />
          </div>
        </div>
        <div>
          <label
            data-slot="form-label"
            className="text-md data-[error=true]:text-red mb-[6px] flex items-center gap-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 first-letter:uppercase"
            for="email"
            data-error="false"
          >
            Elektron pochta manzili
          </label>
          <div className="relative w-full">
            <input
              id="email"
              className="bg-gray flex h-[36px] w-full min-w-0 rounded-[12px] px-[12px] py-[10px] caret-primary invalid:border-red placeholder:text-md invalid:!caret-red invalid:!text-red focus:caret-primary focus:border-primary focus:outline-primary focus:invalid:border-red focus:invalid:outline-red placeholder:font-medium focus:outline disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none"
              placeholder="Elektron pochtangizni kiriting"
              data-slot="input"
              type="email"
              value=""
              name="email"
            />
          </div>
        </div>
        <div>
          <label
            data-slot="form-label"
            className="text-md data-[error=true]:text-red mb-[6px] flex items-center gap-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 first-letter:uppercase"
            for="country"
          >
            Mamlakat
          </label>
          <div className="relative w-full">
            <input
              readonly=""
              id="country"
              className="bg-gray flex h-[36px] w-full min-w-0 rounded-[12px] px-[12px] py-[10px] caret-primary invalid:border-red placeholder:text-md invalid:!caret-red invalid:!text-red focus:caret-primary focus:border-primary focus:outline-primary focus:invalid:border-red focus:invalid:outline-red placeholder:font-medium focus:outline disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none pr-[40px]"
              placeholder="Mamlakatni tanlang"
              data-slot="input"
              type="text"
              value=""
              name="country"
            />
            <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
              <div className="[&amp;_*]:stroke-gray170 rotate-90">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 7L14 12L10 17"
                    stroke="var(--primary)"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <label
            data-slot="form-label"
            className="text-md data-[error=true]:text-red mb-[6px] flex items-center gap-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 first-letter:uppercase"
            for="date"
          >
            Tug‘ilgan sana
          </label>
          <div className="relative w-full">
            <input
              readonly=""
              className="bg-gray flex h-[36px] w-full min-w-0 rounded-[12px] px-[12px] py-[10px] caret-primary invalid:border-red placeholder:text-md invalid:!caret-red invalid:!text-red focus:caret-primary focus:border-primary focus:outline-primary focus:invalid:border-red focus:invalid:outline-red placeholder:font-medium focus:outline disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none pr-[40px]"
              data-slot="input"
              type="text"
              value="KK / OO / YY"
            />
            <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.99889 9.24982C7.58468 9.24982 7.24889 9.58561 7.24889 9.99982C7.24889 10.414 7.58468 10.7498 7.99889 10.7498H8.24889C8.66311 10.7498 8.99889 10.414 8.99889 9.99982C8.99889 9.58561 8.66311 9.24982 8.24889 9.24982H7.99889Z"
                    fill="#9AA0A6"
                  ></path>
                  <path
                    d="M7.24889 13.9998C7.24889 13.5856 7.58468 13.2498 7.99889 13.2498H8.24889C8.66311 13.2498 8.99889 13.5856 8.99889 13.9998C8.99889 14.414 8.66311 14.7498 8.24889 14.7498H7.99889C7.58468 14.7498 7.24889 14.414 7.24889 13.9998Z"
                    fill="#9AA0A6"
                  ></path>
                  <path
                    d="M11.9989 9.24982C11.5847 9.24982 11.2489 9.58561 11.2489 9.99982C11.2489 10.414 11.5847 10.7498 11.9989 10.7498H12.2489C12.6631 10.7498 12.9989 10.414 12.9989 9.99982C12.9989 9.58561 12.6631 9.24982 12.2489 9.24982H11.9989Z"
                    fill="#9AA0A6"
                  ></path>
                  <path
                    d="M11.2489 13.9998C11.2489 13.5856 11.5847 13.2498 11.9989 13.2498H12.2489C12.6631 13.2498 12.9989 13.5856 12.9989 13.9998C12.9989 14.414 12.6631 14.7498 12.2489 14.7498H11.9989C11.5847 14.7498 11.2489 14.414 11.2489 13.9998Z"
                    fill="#9AA0A6"
                  ></path>
                  <path
                    d="M15.9989 9.24982C15.5847 9.24982 15.2489 9.58561 15.2489 9.99982C15.2489 10.414 15.5847 10.7498 15.9989 10.7498H16.2489C16.6631 10.7498 16.9989 10.414 16.9989 9.99982C16.9989 9.58561 16.6631 9.24982 16.2489 9.24982H15.9989Z"
                    fill="#9AA0A6"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.7827 2.15614C11.2505 2.62028 11.4522 3.26002 11.3769 3.99982H13.925C13.9388 3.8847 13.9572 3.7705 13.9806 3.65791C14.0814 3.1732 14.2843 2.67792 14.6631 2.27595C15.051 1.86434 15.5752 1.60196 16.2197 1.51575C16.23 1.51439 16.2402 1.51323 16.2505 1.51229C16.9141 1.45124 17.6925 1.61032 18.2427 2.15614C18.7274 2.63707 18.9264 3.30652 18.8276 4.08048C20.7783 4.4658 22.2494 6.18602 22.2494 8.24982V13.0174C22.2494 13.0526 22.2492 13.0878 22.2489 13.123V18.2498C22.2489 20.597 20.3461 22.4998 17.9989 22.4998H6.49889C4.56086 22.4998 2.96621 21.0297 2.76934 19.1438C1.80447 18.5441 1.32954 17.2853 1.84191 16.1324C2.44021 14.7862 2.74936 13.3295 2.74936 11.8563V8.24982C2.74936 6.08494 4.36801 4.29812 6.46109 4.03358C6.47531 3.90703 6.49492 3.7815 6.52062 3.65791C6.62141 3.1732 6.82439 2.67792 7.20315 2.27595C7.59099 1.86434 8.11521 1.60196 8.75978 1.51575C8.77 1.51439 8.78024 1.51323 8.7905 1.51229C9.45414 1.45124 10.2326 1.61032 10.7827 2.15614ZM8.9431 3.00466C9.30184 2.97522 9.58309 3.07896 9.72622 3.22098C9.81969 3.31371 9.95502 3.52216 9.86294 3.99982H7.98192L7.98921 3.96329C8.05142 3.66412 8.15834 3.44951 8.29486 3.30463C8.42033 3.17147 8.6127 3.0517 8.9431 3.00466ZM17.3229 3.99982C17.415 3.52216 17.2797 3.31371 17.1862 3.22098C17.043 3.07896 16.7618 2.97522 16.4031 3.00466C16.0727 3.0517 15.8803 3.17147 15.7548 3.30463C15.6183 3.44951 15.5114 3.66412 15.4492 3.96329C15.4467 3.9754 15.4442 3.98758 15.4419 3.99982H17.3229ZM13.9577 5.49982C14.0054 5.83951 14.074 6.15985 14.1481 6.44095C14.2537 6.84149 14.6639 7.08062 15.0645 6.97506C15.465 6.8695 15.7041 6.45923 15.5986 6.05869C15.5513 5.87912 15.5095 5.69094 15.4761 5.49982H17.9994C19.5181 5.49982 20.7494 6.73104 20.7494 8.24982V12.7498L20.7489 13.1161C20.742 13.8474 20.6586 14.5761 20.4999 15.2902C20.148 16.8734 18.7438 17.9998 17.122 17.9998H4.0303C3.38278 17.9998 2.94965 17.3333 3.21263 16.7416C3.89617 15.2037 4.24936 13.5394 4.24936 11.8563V8.24982C4.24936 6.90013 5.22169 5.77753 6.50409 5.5443C6.55142 5.86747 6.61731 6.17215 6.68815 6.44095C6.79371 6.84149 7.20398 7.08062 7.60452 6.97506C8.00505 6.8695 8.24418 6.45923 8.13862 6.05869C8.0913 5.87912 8.04953 5.69094 8.0161 5.49982H13.9577ZM20.7489 18.2498V17.9236C19.8349 18.9024 18.5362 19.4998 17.122 19.4998H4.37692C4.6858 20.3737 5.51923 20.9998 6.49889 20.9998H17.9989C19.5177 20.9998 20.7489 19.7686 20.7489 18.2498Z"
                    fill="#9AA0A6"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[6px]">
          <label
            data-slot="label"
            className="text-md data-[error=true]:text-red mb-[6px] flex items-center gap-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 first-letter:uppercase title"
          >
            Jins
          </label>
          <div
            role="radiogroup"
            aria-required="false"
            dir="ltr"
            data-slot="radio-group"
            className=""
            tabindex="0"
            className="outline: none"
          >
            <ul className="grid grid-cols-2 gap-[13px]" id="gender">
              <li className="flex items-center gap-[8px]">
                <button
                  type="button"
                  role="radio"
                  aria-checked="false"
                  data-state="unchecked"
                  value="MALE"
                  data-slot="radio-group-item"
                  className="relative flex h-6 w-6 cursor-pointer items-center justify-center"
                  tabindex="-1"
                  data-radix-collection-item=""
                >
                  <div className="absolute">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="9.25"
                        stroke="#BDC1C6"
                        stroke-width="1.5"
                      ></circle>
                    </svg>
                  </div>
                </button>
                <input
                  aria-hidden="true"
                  tabindex="-1"
                  type="radio"
                  value="MALE"
                  name="gender"
                  className="w-[24px] h-[24px] -translate-x-full absolute pointer-events-none opacity-0"
                />
                <h4 className="text">Erkak</h4>
              </li>
              <li className="flex items-center gap-[8px]">
                <button
                  type="button"
                  role="radio"
                  aria-checked="false"
                  data-state="unchecked"
                  value="FEMALE"
                  data-slot="radio-group-item"
                  className="relative flex h-6 w-6 cursor-pointer items-center justify-center"
                  tabindex="-1"
                  data-radix-collection-item=""
                >
                  <div className="absolute">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="9.25"
                        stroke="#BDC1C6"
                        stroke-width="1.5"
                      ></circle>
                    </svg>
                  </div>
                </button>
                <input
                  aria-hidden="true"
                  tabindex="-1"
                  type="radio"
                  value="FEMALE"
                  name="gender"
                  className="w-[24px] h-[24px] -translate-x-full absolute pointer-events-none opacity-0"
                />
                <h4 className="text">Ayol</h4>
              </li>
            </ul>
          </div>
        </div>
        <button
          type="submit"
          data-slot="button"
          className="items-center cursor-pointer justify-center gap-2 whitespace-nowrap radius-md text-md transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-white !text-md font-semibold hover:bg-primary/90 leading-[150%] disabled:bg-gray20 disabled:text-gray30 h-[42px] px-6 hidden w-full rounded-[14px] lg:flex"
        >
          Saqlash
        </button>
      </div>
    </div>
  );
}

export default PersonalInfo;
