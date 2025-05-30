# Mikrotik Paystack Automation

This project automates the creation of Mikrotik user accounts after a successful payment is made through Paystack.

## Prerequisites

-   Node.js
-   npm
-   Paystack account and API keys
-   Mikrotik router

## Setup

1.  Clone the repository.
2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Create a `.env` file in the root directory with the following variables:

    ```
    PAYSTACK_SECRET_KEY=YOUR_PAYSTACK_SECRET_KEY
    MIKROTIK_HOST=your_router_ip
    MIKROTIK_USER=your_router_username
    MIKROTIK_PASSWORD=your_router_password
    ```

    Replace `YOUR_PAYSTACK_SECRET_KEY`, `your_router_ip`, `your_router_username`, and `your_router_password` with your actual credentials.

## Usage

1.  Start the server:

    ```bash
    node index.js
    ```

2.  The server will be running on port 3000.

## API Endpoint

-   `/verify-payment`: This endpoint is used to verify the payment and create a Mikrotik user.

    Method: POST

    Body:

    ```json
    {
      "reference": "PAYSTACK_TRANSACTION_REFERENCE"
    }
    ```

    Replace `PAYSTACK_TRANSACTION_REFERENCE` with the Paystack transaction reference.

## Notes

-   Make sure to replace the placeholder values in the `.env` file with your actual credentials.
-   This project uses the `node-routeros` library to connect to the Mikrotik router. Make sure your router is configured to allow API connections.
