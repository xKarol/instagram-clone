import Link from "next/link";
import NotFoundContainer from "./not-found-container";
import NotFoundHeading from "./not-found-heading";
import { ROUTE_HOME } from "../../constants/routes";

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundHeading>Sorry, this page isn&apos;t available.</NotFoundHeading>
      <p>
        The link you followed may be broken, or the page may have been removed.
        &nbsp;
        <Link href={ROUTE_HOME}>
          <a className="text-blue">Go back to Instagram.</a>
        </Link>
      </p>
    </NotFoundContainer>
  );
};

export default NotFound;
