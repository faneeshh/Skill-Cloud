import { Link, useParams } from "react-router-dom";
import { timeAgo } from "../../Services/Utilities";

const PostedJobCard = (props:any) => {
  const { id } = useParams();

  return (
    <Link
      to={`/posted-job/${props.id}`}
      className={`rounded-xl p-2 hover:bg-opacity-80 cursor-pointer border-l-2 border-kashmir-blue-300 ${
        props.isSelected || props.id == id
          ? "bg-kashmir-blue-400 text-black"
          : "bg-mine-shaft-900 text-mine-shaft-300"
      }`}
      onClick={props.onClick}
    >
      <div className="text-sm font-semibold">{props.jobTitle}</div>
      <div className="text-xs font-medium">{props.location}</div>
      <div className="text-xs">{props.jobStatus == "DRAFT"?"Drafted":props.jobStatus == "CLOSED"?"Closed":"Posted"} {timeAgo(props.postTime)}</div>
    </Link>
  );
};

export default PostedJobCard;