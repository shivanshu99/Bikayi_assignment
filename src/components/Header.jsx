import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	backc: {
		backgroundColor: "#FAF7F2"
	},

}));


function Header() {
	
	
   const classes = useStyles();
  return (
		<Grid container>
			<Grid item xs={4}>
				<Box height="8rem" width="20vw" clone>
					<img src="https://bikayi.com/newlogo.png" alt="" />
				</Box>
			</Grid>
			<Grid item xs={4}>
				<Box mt={4} color="white">
					<Typography variant="h3" component="p">
						Nobel Price Winners
					</Typography>
				</Box>
			</Grid>
			
		</Grid>
  );
}

export default Header;
