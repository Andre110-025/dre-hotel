<script setup>
import { ref, onMounted } from "vue";
import { VueFinalModal } from "vue-final-modal";
import { useHelpers } from "../../../helper";
import { useUserStore } from "../../../stores/user";
import PaystackPop from "@paystack/inline-js";
import { toast } from "vue3-toastify";
import axios from "axios";
import { useRouter } from "vue-router";
import IconSpinner from "../../icons/IconSpinner.vue";

const { userDetails } = useUserStore();

const router = useRouter();

const { formatCurrency, channelList, generateRandomRef } = useHelpers();


const props = defineProps({
  paymentID: String,
  formType: String,
  appPurpose: {
    default: "Application for New Sign",
    type: String,
  },
});

const emit = defineEmits(["confirm"]);

const loading = ref(false);

const payData = ref(null);

const getPaymentInfo = async () => {
  try {
    const response = await axios.post("getpaymentinfo", {
      type_ads: props.formType,
      paymentId: props.paymentID,
    });

    console.log(response);

    if (response.data.success) {
      payData.value = response.data;
    }
  } catch (error) {
    emit("confirm");
  }
};

const infoWallet = {
  reference_id: `wa${props.paymentID}`,
  payment_id: props.paymentID,
  form_type: props.formType,
  payment_type: "Wallet",
};

const adsType = () => {
  if (props.formType === "OutdoorRequest") {
    return "OutdoorSite";
  } else {
    return props.formType;
  }
};

function startCredoPayment () {
    const transactionRef = generateRandomRef();
    const amount = payData.value.total_price + (payData.value.chargeFee || payData.value.ChargeFee)

    const handler = window.CredoWidget.setup({
        key: '093NGDDGVD3HCGDBsDJCfGDBCBH',  // this is a fake credo public key
        email: userDetails.userInfo.email,
        amount: amount, // for test
        currency: 'NGN',
        renderSize: 0, // don't know what it's for yet
        channels: channelList(amount),
        reference: transactionRef,
        metadata: {
            paymentFor: "Application Fee",
            paymentId: props.paymentID,
            appType: adsType(),
            appPurpose: props.appPurpose,
        },
        callbackUrl: "https://merchant-test-line.netlify.app/successful", 
        onClose: () => {
            console.log("Widget Closed");
            toast.error("Payment Cancelled", {
                position: toast.POSITION.TOP_CENTER,
            });   
        },
        // callBack: (response) => {
        //     console.log("Successful Payment", response);
        //     setTimeout(() => emit("confirm"), 7000);

        //     toast.success("Payment Successful", {
        //         position: toast.POSITION.TOP_CENTER,
        //     });
        //     toast.success("Kindly check your mail", {
        //         position: toast.POSITION.TOP_CENTER,
        //     });
        // },
        onSuccess: (response) => {
            console.log("Successful Payment", response);
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
}

function startPayment() {
  loading.value = true;
  const paystack = new PaystackPop();

  const amount =
    payData.value.total_price +
    (payData.value.chargeFee || payData.value.ChargeFee);

  paystack.newTransaction({
    key: import.meta.env.VITE_ENV_STRING + payData.value.additionalInfo,
    email: userDetails.userInfo.email,
    amount: amount * 100,
    channels: channelList(amount),
    metadata: {
      paymentFor: "Application Fee",
      paymentId: props.paymentID,
      appType: adsType(),
      appPurpose: props.appPurpose,
    },
    onSuccess: (transaction) => {
      console.log(transaction);
      const data = {
        reference_id: transaction.reference,
        payment_id: props.paymentID,
        form_type: props.formType,
        payment_type: "Paystack",
      };

      setTimeout(() => emit("confirm"), 7000);

      toast.success("Your Application is being Processed", {
        position: toast.POSITION.TOP_CENTER,
      });
    },
    onCancel: () => {
      toast.error("Payment Cancelled", {
        position: toast.POSITION.TOP_CENTER,
      });
      loading.value = false;
    },
  });
}

const submitPayInfo = async (data) => {
  loading.value = true;

  console.log(data);
  try {
    const response = await axios.post("confirmpayment", data);

    if (response.status === 200) {
      toast.success("Payment Successful", {
        position: toast.POSITION.TOP_CENTER,
      });
      toast.success("Your Application is being Processed", {
        position: toast.POSITION.TOP_CENTER,
      });

      // router.push({ name: "Overview" });
      emit("confirm");
    }
  } catch (error) {
    if (error.response.data.data) {
      toast.error(error.response.data.data, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error("Your Payment Could not be confirmed", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    router.push({ name: "RequestLists" });
    emit("confirm");
  }
};

const walletPay = () => {
  if (
    props.formType === "Firstparty TemporaryAds" ||
    props.formType === "OutdoorRequest" ||
    props.formType === "SmallFormat Application" ||
    props.formType === "SmallFormat Inspection" ||
    props.formType === "OutdoorSite"
  ) {
    return false;
  } else return true;
};

onMounted(() => {
  getPaymentInfo();
});
</script>

<template>
  <VueFinalModal
    class="flex h-full w-full justify-center items-center"
    content-class="relative bg-white border space-y-2 w-full sm:w-4/5 sm:min-w-[28.125rem] min-h-[350px] max-w-[340px]"
    overlay-class="bg-background/80 backdrop-blur-sm"
    :overlayTransition="'vfm-fade'"
    :contentTransition="'vfm-fade'"
    :clickToClose="false"
  >
    <div class="border-b-2 border-dashed">
      <h4 v-if="formType === 'SmallFormat Inspection'" class="px-5 py-8 text-center">Inspection Fee</h4>
      <h4 v-else class="px-5 py-8 text-center">Application Fee</h4>
    </div>
    <div class="p-10" v-if="payData">
      <div class="flex flex-col justify-center mt-5">
        <span class="font-semibold text-red-700 text-center"
          >Total
          <i v-if="formType === 'OutdoorSite'" class="text-xs"
            >(Inspection Fee inclusive)</i
          ></span
        >
        <span
          class="font-semibold text-red-700 text-center my-5"
          v-text="formatCurrency(parseInt(payData.total_price))"
        ></span>
      </div>
      <div
        v-if="payData.chargeFee"
        class="flex flex-col justify-center items-center gap-5 mb-5"
      >
        <h4 class="text-sm font-medium">Paystack Charge</h4>

        <p
          v-text="formatCurrency(payData.chargeFee)"
          class="font-semibold text-xl"
        ></p>
      </div>

      <!-- <p v-else class="text-center italic mt-10">
        Getting Your Application Fee
      </p> -->
      <div v-if="payData">
        <button
          :disabled="loading"
          @click="startPayment"
          class="blueBtn max-w-[200px] w-full mt-5 mx-auto rounded-none"
        >
          <IconSpinner v-if="loading" />
          <span class="text-sm font-medium text-white" v-if="!loading">
            Pay with Paystack
          </span>
        </button>

        <button
          :disabled="loading"
          @click="submitPayInfo(infoWallet)"
          v-if="false"
          class="blueBtn max-w-[200px] w-full mt-5 mx-auto rounded-none"
        >
          <IconSpinner v-if="loading" />
          <span class="text-sm font-medium text-white" v-if="!loading">
            Pay From Wallet
          </span>
        </button>
      </div>
    </div>
  </VueFinalModal>
</template>
