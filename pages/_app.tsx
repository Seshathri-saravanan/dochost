import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AuthProvider } from "../src/hooks/useAuth";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {},
    h3: {
      fontSize: "2.2rem",
      fontWeight: "bold",
      color: "#3c0194",
    },
    h5: {
      fontSize: "1.75rem",
      fontWeight: "bold",
      color: "#190342",
    },
    h6: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#2554c2",
    },
    subtitle1: {
      fontSize: "1.05rem",
      fontWeight: "500",
      color: "#493294",
    },
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#183578",
          border: "0px",
          borderColor: "black",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#0c178a",
    },
  },
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>DocHost</title>
        <meta name="description" content="Create documentation easily" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </AuthProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
