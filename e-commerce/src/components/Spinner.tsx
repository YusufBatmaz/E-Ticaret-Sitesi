import { Backdrop, CircularProgress } from '@mui/material';

interface SpinnerProps {
  loading: boolean;
}

function Spinner({ loading }: SpinnerProps) {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
      }}
      open={loading}
    >
      <CircularProgress 
        color="inherit" 
        size={60}
        thickness={4}
      />
    </Backdrop>
  );
}

export default Spinner;
