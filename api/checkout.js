const stripeAPI=require('./stripe');

async function createCheckoutSession(req, res){
    const domainUrl = process.env.WEB_APP_URL;
    const {line_items, customer_email} = req.body;
    //check req body has line items and email

    if (!line_items || customer_email) {
        return res.status(400) .json({error: 'missing required session parameters'});
    }

    let session;

    try {
        session = await stripeAPI.checkout.sessions.create({
            payment_method_type:['card'],
            mode:'payment',
            line_items, 
            customer_email,
            success_url:`${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domainUrl}/cancel`,
            shipping_address_collectoin: {allowed_countries:['GB', 'US'] }
        });
        res.status(200).json({sessioID:session.id});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: 'an occur occured. Unable to create session.'});
    }
}

module.exports = createCheckoutSession;