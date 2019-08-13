import { useEffect, useState } from "react";
import drive from "drive-db";

export default options => {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (data) return;
    drive(options).then(setData);
  }, data);
  return data;
};
