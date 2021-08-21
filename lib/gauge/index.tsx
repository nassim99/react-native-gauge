import * as React from "react";
import Svg, { Path, Text } from "react-native-svg";
import { validateValue } from "./utils/helpers";

interface GaugeSVGProps {
  value: number;
  gaugeColor?: string;
  gaugeValueColor?: string;
  gaugeStroke?: number;
  gaugeValueStroke?: number;
  insideTextColor?: string;
  size?: number;
  children?: React.ReactNode;
}
const GaugeSVG: React.FC<GaugeSVGProps> = ({
  value,
  gaugeColor = "#ff0",
  gaugeValueColor = "#666",
  gaugeStroke = 2,
  gaugeValueStroke = 2.5,
  children,
  insideTextColor = "#999",
  size = 150,
}) => {
  const validatedValue = validateValue(value, 0, 100);
  const opts = {
    dialRadius: 40,
    dialStartAngle: 135,
  };

  function getAngle(gaugeSpanAngle: any) {
    return (validatedValue * gaugeSpanAngle) / 100;
  }

  function getCartesian(cx: any, cy: any, radius: any, angle: any) {
    var rad = (angle * Math.PI) / 180;
    return {
      x: Math.round((cx + radius * Math.cos(rad)) * 1000) / 1000,
      y: Math.round((cy + radius * Math.sin(rad)) * 1000) / 1000,
    };
  }

  function getDialCoords(radius: any, startAngle: any, endAngle: any) {
    var cx = 50,
      cy = 50;
    return {
      end: getCartesian(cx, cy, radius, endAngle),
      start: getCartesian(cx, cy, radius, startAngle),
    };
  }

  function updateGauge() {
    const angle = getAngle(360 - Math.abs(136 - 45)),
      flag = angle <= 180 ? 0 : 1;

    return pathString(
      opts.dialRadius,
      opts.dialStartAngle,
      angle + opts.dialStartAngle,
      flag,
    );
  }

  function pathString(
    radius: any,
    startAngle: any,
    endAngle: any,
    largeArc: any,
  ) {
    var coords = getDialCoords(radius, startAngle, endAngle),
      start = coords.start,
      end = coords.end,
      largeArcFlag = typeof largeArc === "undefined" ? 1 : largeArc;

    return [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      1,
      end.x,
      end.y,
    ].join(" ");
  }

  return (
    <Svg height={size} width={size} viewBox="0 0 100 100">
      <Path
        strokeDasharray="50,0,20,0"
        fill="none"
        stroke={gaugeColor}
        strokeWidth={gaugeStroke}
        d="M 21.716 78.284 A 40 40 0 1 1 78.284 78.284"
        strokeLinecap="round"
      />

      {!!children ? (
        children
      ) : (
        <Text x={50} y={50} fill={insideTextColor} textAnchor="middle">
          {validatedValue}
        </Text>
      )}
      <Path
        strokeDasharray="50,0,20,0"
        fill="none"
        stroke={gaugeValueColor}
        strokeWidth={gaugeValueStroke}
        d={updateGauge()}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default GaugeSVG;
