import React from 'react';

const MoneyBackGuarantee = () => {
  return (
    <section className="bg-white py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-gray-700 mb-4">
          Please note that only fulfillment of all the above requirements allows you to receive a complete voluntary refund under <strong>“Money-back guarantee”</strong>. For the sake of clarity, this <strong>“Money-back guarantee”</strong> does not apply to the following cases:
        </p>

        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>
            Personal reasons (you don’t like the product, it did not meet your expectations,
            etc.);
          </li>
          <li>
            Financial reasons (you did not expect that you will be charged, that the trial will be
            converted into the subscription, that the subscription will automatically renew, or
            that the services are paid, etc.).
          </li>
        </ul>

        <p className="text-gray-700 mb-4">
          Please note that you may still cancel your subscription without a voluntary refund by
          contacting us via email{" "}
          <a href="mailto:support@plantin.xyz" className="text-blue-500 hover:underline">
            support@plantin.xyz
          </a>
          . For more details, please refer to Subscription Terms.
        </p>

        <p className="text-gray-700 mb-4">
          <strong>3. GENERAL REFUND RULES</strong>
        </p>

        <p className="text-gray-700 mb-4">
          Generally, if you do not meet the conditions set out above, the fees you have paid are
          refundable under conditions stated in the Money Back policy.
        </p>

        <p className="text-gray-700 mb-4">
          Note for the EU residents: If you are an EU resident, you have the right to withdraw from
          the agreement for purchase of digital content without charge and without giving any reason
          within fourteen (14) days from the date of such agreement conclusion. The withdrawal right
          does not apply if the performance of the agreement has begun with your prior express
          consent and your acknowledgment that you thereby lose your right of withdrawal.{" "}
          <strong>
            YOU HEREBY EXPRESSLY CONSENT TO THE IMMEDIATE PERFORMANCE OF THE AGREEMENT AND ACKNOWLEDGE
            THAT YOU WILL LOSE YOUR RIGHT OF WITHDRAWAL FROM THE AGREEMENT ONCE OUR SERVERS VALIDATE
            YOUR PURCHASE AND THE APPLICABLE PURCHASE IS SUCCESSFULLY DELIVERED TO YOU.
          </strong>{" "}
          Therefore, you will not be eligible for a refund, unless the digital content is defective.
        </p>

        <p className="text-gray-700">
          <strong>LAST UPDATED:</strong> June 11, 2024
        </p>
      </div>
    </section>
  );
};

export default MoneyBackGuarantee;
