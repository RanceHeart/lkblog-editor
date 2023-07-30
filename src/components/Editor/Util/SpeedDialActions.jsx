import {SpeedDial, SpeedDialAction} from "@mui/material";
import {FaUpload} from "react-icons/fa";
import React from "react";
import SaveAsIcon from "@mui/icons-material/SaveAs.js";
import InventoryIcon from "@mui/icons-material/Inventory.js";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever.js";

const actions = [
    {icon: <SaveAsIcon sx={{color: '#6b6b6b', opacity: 0.85}}/>, name: 'Save as draft'},
    {icon: <InventoryIcon sx={{color: '#ffaa00', opacity: 0.85}}/>, name: 'Save as template'},
    {icon: <DeleteForeverIcon sx={{color: '#cc0000', opacity: 0.85}}/>, name: 'Drop'},
];

const SpeedDialActions = ({open, onSave}) => (
    <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        icon={<FaUpload/>}
        open={open}
        onClick={onSave}
        direction="up"
        sx={{position: 'fixed', bottom: "15%", right: "15%"}}
    >
        {actions.map((action, index) => {
            const startDegree = 90;  // Adjust this value to change the starting degree
            const rotationAngle = startDegree + index * 50;

            return (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => {}}
                    sx={{
                        position: 'absolute',
                        bottom: '0%',
                        right: '0%',
                        transform: `rotate(-${rotationAngle}deg) translate(70px) rotate(${rotationAngle}deg)`,
                        transformOrigin: 'bottom right',
                    }}
                />
            );
        })}
    </SpeedDial>
);

export default SpeedDialActions