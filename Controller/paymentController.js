const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.CheckoutPayment = async (req, res) => {
    const items = req.body.itemData || []
    const successURL = req.body.successURL
    const failedURL = req.body.failedUrl
    if (!items || !successURL || !failedURL) return res.status(400).json({ message: "Missing data" })
    if (items?.length <= 0) return res.status(200).json({ success: false, message: "No items found" })

    const lineItems = items?.map((data, index) => {
        return (
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: data?.title,
                        images: [data.image],
                    },
                    unit_amount: Math.floor(data?.subTotal * 100)
                },
                quantity: data?.count
            }
        )
    })
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: successURL,
            cancel_url: failedURL,
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.VerifyPayment = async (req, res) => {
    const { sessionId } = req.body;
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        console.log(session, "Session")
        if (session.payment_status === 'paid') {
            res.json({ success: true, paymentStatus: 'paid', session });
        } else {
            res.json({ success: false, paymentStatus: 'unpaid' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ error: error.message });
    }
};