"use client";

import Reviews from "~/components/Reviews/Review";
import { useSession } from "next-auth/react"; // Assuming you're using next-auth for user sessions

const OfferPage = () => {
  // //   const { query } = useRouter();
  // //   const { offerId } = query;
  //   const { data: session } = useSession();

  //   if (!offerId || !session?.user?.id) return null;

  return (
    <div>
      <h1>Offer Details</h1>
      {/* Offer details code here */}

      <Reviews offerId={"1"} userId={"2"} />
    </div>
  );
};

export default OfferPage;
