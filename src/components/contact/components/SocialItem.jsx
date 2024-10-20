/* eslint-disable react/prop-types */
export default function SocialItem({ title, link, icon }) {
  const IconComponent = icon;
  return (
    <a
      href={link}
      target="_blank"
      className="flex flex-row justify-start items-center sm:mb-10 mb-0 sm:mx-0 mx-2"
    >
      <IconComponent className="me-5 text-2xl text-primary-500" />
      <div>
        <h4 className="font-Lufga text-2xl  font-medium m-0 p-0 text-secondary dark:text-neutral-200 hidden sm:block">
          {title}
        </h4>
      </div>
    </a>
  );
}
