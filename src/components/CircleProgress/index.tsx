import { FC, useEffect, useState } from "react";
import ProgressProps from "./CircleProgress.props";
import Container from "./CircleProgress.style";

const CircleProgress: FC<ProgressProps> = ({ total, value }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let num = 0;
    if (total > 0) {
      num = (value / total) * 100;
    }

    setPercent(num);
  }, [total, value]);

  return (
    <Container>
      <div className="chart-wrapper">
        <div className="chart-wrapper__value">{percent.toFixed(0)}%</div>
        <svg height="194" width="194">
          <circle
            cx="97"
            cy="97"
            r="87"
            fill="none"
            strokeWidth="20"
            stroke="#F2F2F2"
          ></circle>
          <circle
            cx="97"
            className="progress"
            cy="97"
            r="87"
            fill="none"
            strokeWidth="20"
            stroke="url(#paint0_linear)"
            style={{
              strokeDasharray: "546.637, 546.637",
              strokeDashoffset: (87 * 2 * Math.PI * (100 - percent)) / 100,
            }}
          ></circle>
          <circle
            style={{ display: "none" }}
            className="dot"
            r="6.22024"
            fill="#FFEBA2"
            cx="179.74191691767834"
            cy="70.11552148937955"
          ></circle>
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="22.4437"
              y1="231.172"
              x2="278.88"
              y2="201.8"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF9600"></stop>
              <stop offset="1" stopColor="#FFCB08"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </Container>
  );
};

export default CircleProgress;
