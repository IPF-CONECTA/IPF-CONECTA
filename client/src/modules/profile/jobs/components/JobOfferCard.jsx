import DOMPurify from "dompurify";
import { BASE_URL } from "../../../../constants/BASE_URL";
import { getFullDate } from "../../../../helpers/getTime";

export const JobOfferCard = ({ jobOffer, description }) => {
  console.log(jobOffer);

  const shortdescription =
    description?.length > 40
      ? `${description.substring(0, 40)}...`
      : description;

  return (
    <div>
      <div>
        <div className="card w-100">
          <div className="card-header">
            <h5>{jobOffer.company.name}</h5>

            <img
              src={`${BASE_URL}/logoUrl/${jobOffer.company.logoUrl}`}
              crossOrigin="anonymous"
              height={50}
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">{jobOffer.title}</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(shortdescription),
              }}
            ></div>
            <p className="card-text">{getFullDate(jobOffer.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
