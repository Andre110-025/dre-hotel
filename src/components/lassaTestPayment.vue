<script setup>
import { ref } from "vue";
// import { useHelpers } from "../../helper";
import { useHelpers } from "@/helper";
// import PaystackPop from "@paystack/inline-js";
// import { useUserStore } from "../../stores/user";
import { useUserStore } from '@/stores/user'
import { toast } from "vue3-toastify";
import axios from "axios";
// import IconSpinner from "../icons/IconSpinner.vue";

// these are helpers function
// formatCurrency, getting currency Naira
// channelList, shows which payment option to use
// generateRandomRef, manunally genrating like a payment ref id
const { formatCurrency, channelList, generateRandomRef } = useHelpers();

// getting userdetails from the store
const { userDetails } = useUserStore();

const isLoading = ref(false);
const payData = ref(null);


// choosing the value of whatever the uses chooses on payment
const props = defineProps({
  title: {
    type: String,
  },
  type: String,
});

// dynamically getting the API endpoint based on what the uses chooses
const getUrl = () => {
  if (props.type === "Onpremise") {
    return "bulkonpremisepermitfeepayment";
  } else if (props.type === "OutDoor Site") {
    return "getbulkarrearsforoutdoor";
  } else if (props.type === "SmallFormat Details") {
    return "getbulksmallformatdetailsarrears"
  }
};

// calling the endpoint the user chooses
const getPayment = async () => {
  try {
    isLoading.value = true;

    const { data } = await axios.get(getUrl());

    // console.log(data);

    if (data.success) {
      payData.value = data;
      isLoading.value = false;
    }
  } catch (error) {
    // emit("confirm");
    isLoading.value = false;
  }
};

function startPayment() {
  const paystack = new PaystackPop();

  // adding the amount sent from the backend. saved in payData
  const amount = payData.value.total_price + payData.value.ChargeFee;

  paystack.newTransaction({
    key: import.meta.env.VITE_ENV_STRING + payData.value.additionalInfo,
    // getting user email from user.js store
    email: userDetails.userInfo.email,
    amount: amount * 100,
    channels: channelList(amount),
    // it sending those info to paystack
    metadata: {
      paymentFor: "Permit Bill",
      applicationId: payData.value.applicationId,
      appType: props.type,
      appPurpose: "Bulk Payment",
      permitFee: payData.value.total_price,
    },
    onSuccess: (transaction) => {
      console.log(transaction);
      // const data = {
      //   reference_id: transaction.reference,
      //   payment_id: props.paymentID,
      //   form_type: props.formType,
      //   payment_type: "Paystack",
      // };

      setTimeout(() => getPayment(), 7000);

      toast.success("Payment Successful", {
        position: toast.POSITION.TOP_CENTER,
      });
      toast.success("Kindly check your mail", {
        position: toast.POSITION.TOP_CENTER,
      });
    },
    onCancel: () => {
      toast.error("Payment Cancelled", {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  });
}


// credo payment function wasn't used. TBD
const startCredoPay = () => {
  loading.value = true;

  // this is getting the ref from
  const transRef = generateRandomRef();
  const amount = payData.value.total_price + payData.value.ChargeFee;

  // console.log("Amount", amount * 100, amount, payData.value.total_price, payData.value.ChargeFee);
  // return
  const handler = window.CredoWidget.setup({
    key: "0PUB1289Hzp1WR1GU15BPjyIA0PbcTQK", // this is credo public key
    // customerFirstName: 'Ciroma',
    // customerLastName: 'Chukwuma',
    email: userDetails.userInfo.email,
    amount: amount * 100,
    currency: "NGN",
    renderSize: 0,
    channels: ["card", "bank"],
    reference: transRef,
    // customerPhoneNumber: '08032698425',
    // same metadata sent to paystack
    metadata: {
      paymentFor: "Permit Bill",
      applicationId: payData.value.applicationId,
      appType: props.type,
      appPurpose: "Bulk Payment",
      permitFee: payData.value.total_price,
    },
    callbackUrl: "https://merchant-test-line.netlify.app/successful", // on success redirect you to a success/thank you page
    onClose: () => {
      console.log("Widget Closed");
      toast.error("Payment Cancelled", {
        position: toast.POSITION.TOP_CENTER,
      });
      loading.value = false;
    },
    callBack: (response) => {
      console.log("Successful Payment", response);
      // window.location.href = response.callbackUrl
      setTimeout(() => emit("confirm"), 7000);

      toast.success("Payment Successful", {
        position: toast.POSITION.TOP_CENTER,
      });
      toast.success("Kindly check your mail", {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  });

  handler.openIframe();
};


getPayment();
</script>

<template>
  <div
    class="bg-indigo-100 grow bg-opacity-25 py-2.5 px-3.5 border border-blue-300 rounded-xl max-w-[320px]"
  >
    <div v-if="isLoading" class="h-10 flex justify-center items-center">
      <div
        class="animate-spin rounded-full h-8 w-8 border-2 border-mainColor border-t-transparent"
      ></div>
    </div>
    <div v-else>
      <p class="mb-3.5 font-medium" v-text="title"></p>

      <span class="text-sm">Total Permit Bill</span>
      <h4>{{ formatCurrency(payData.total_price) }}</h4>

      <div v-if="payData.total_price > 1000" class="mt-5 flex flex-col items-center">
        <button @click="startCredoPay()" class="blueBtn max-w-[200px] w-full">
          Pay Now
        </button>

        <span class="italic text-red-500 text-xs block mt-2"
          >{{ formatCurrency(payData.ChargeFee) }} charge applies</span
        >
      </div>
    </div>
  </div>
</template>
