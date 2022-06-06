import React from "react";
import { Carousel } from "react-bootstrap";
import style from "./CardView.style";

interface CardViewProps {
  onPress: React.MouseEventHandler<any>;
}

function CardView() {
  return (
    <div>
      <img
        src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.linkedin.com%2Fcompany%2Fimg-golf-course-management&psig=AOvVaw1smbzpmMf_GgSFDP3miZc6&ust=1651787188687000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJDx5PboxvcCFQAAAAAdAAAAABAD"
        alt="text"
      />
    </div>
  );
}

export default CardView;
