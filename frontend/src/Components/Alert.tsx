
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';



export default function SimpleAlert({ message }: { message: string }) {
    return (

        <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    );
}



