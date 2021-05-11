import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    tableWrapper: { height: 400, width: "100%" },
}));

const columns = [
    { field: "date", headerName: "Date", width: 125 },
    {
        field: "animal",
        headerName: "Animal",
        width: 125,
    },
    { field: "coordinates", headerName: "Coordinates", width: 175 },
    { field: "user", headerName: "User", width: 100 },
    { field: "dateSubmitted", headerName: "Date Submitted", width: 175 },
];

function Sightings({ sightings }) {
    const makeRows = () => {
        let r = [];
        sightings.forEach((s) => {
            r.push({
                id: s._id,
                date: s.date.split("T")[0],
                animal: s.animal.type,
                coordinates: `${s.location.latitude.toFixed(
                    4
                )}, ${s.location.longitude.toFixed(4)}`,
                user: s.user.username,
                dateSubmitted: s.createdAt.split("T")[0],
            });
        });
        return r;
    };

    const classes = useStyles();

    return (
        <div>
            <h2>Sightings</h2>
            {!sightings ? (
                <CircularProgress />
            ) : (
                <div className={classes.tableWrapper}>
                    <DataGrid
                        rows={makeRows()}
                        columns={columns}
                        pageSize={5}
                    ></DataGrid>
                </div>
            )}
        </div>
    );
}

export default Sightings;
