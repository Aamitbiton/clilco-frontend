import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';

export default function SimpleBottomNavigation({state}) {
    const [value, setValue] = React.useState(0);

    return (
        <Box sx={{ width: '100%' }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    state(newValue)
                }}
            >
                <BottomNavigationAction label="כניסה" icon={<LoginIcon />} />
                <BottomNavigationAction label="הרשמה" icon={<AppRegistrationIcon />} />
            </BottomNavigation>
        </Box>
    );
}