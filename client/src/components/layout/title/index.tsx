import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";
import { Button } from "@pankod/refine-mui";
import { shlogo} from "assets";
export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/">
        {collapsed ? (
          <img src={shlogo} alt="shlogo" width="40px" />
        ) : (
          <img src={shlogo} alt="shlogo" width="50px" />
        )}
      </Link>
    </Button>
  );
};
