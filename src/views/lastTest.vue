<script setup>
import { ref, onMounted } from "vue";
import { VueFinalModal } from "vue-final-modal";
import { useHelpers } from "../../../helper";
import { useUserStore } from "../../../stores/user";
// import PaystackPop from "@paystack/inline-js";
import { toast } from "vue3-toastify";
import axios from "axios";
import IconSpinner from "../../icons/IconSpinner.vue";

const { userDetails } = useUserStore();

const { formatCurrency, channelList } = useHelpers();
const props = defineProps({
  appID: Number,
  adType: String,
  paymentID: String,
});

const emit = defineEmits(["confirm"]);

const getEndPoint = () => {
  if (props.adType === "Onpremise") return "onpremisepayment";
  else if (props.adType === "Mobile") return "mobileadspayment";
  else if (props.adType === "ThirdPartyMobile")
    return "thirdpartymobilepayment";
  else if (props.adType === "OutDoor Site") return "outdoorsignagepayment";
  else if (props.adType === 'Firstparty TemporaryAds' ) return 'firstpartytemporarypayment'
};

const loading = ref(false);

const permitCost = ref(null);

const getPaymentInfo = async () => {
  try {
    const response = await axios.get(`${getEndPoint()}/${props.appID}`);

    console.log(response);

    if (response.status === 200) {
      permitCost.value = response.data;
    }
  } catch (error) {
    // emit('confirm')
  }
};

const infoWallet = {
  reference_id: `wa${props.paymentID}`,
  payment_id: props.paymentID,
  type_ads: props.adType,
  payment_type: "Wallet",
};

const startCredoPayment = () => {
  loading.value = true;
  const transRef = generateRandomRef();
  const amount = (permitCost.value.Total || permitCost.value['Total Fee']) + permitCost.value.ChargeFee;

  const handler = window.CredoWidget.setup({
    key: 'OJD834H7jrr7UD484U8RHFJJFJ',  // test credo public key
    email: userDetails.userInfo.email,
    amount: amount * 100,
    currency: 'NGN',
    renderSize: 0,
    channels: channelList(amount),
    reference: transRef,
    metadata: {
        paymentFor: "Permit Bill",
        applicationId: props.appID,
        appType: props.adType,
    },
    callbackUrl: "https://merchant-test-line.netlify.app/successful",
    callBack: (transaction) => {
      console.log(transaction);
      const data = {
        reference_id: transaction.reference,
        payment_id: props.paymentID,
        type_ads: props.adType,
        payment_type: "Credo",
      };
      setTimeout(() => emit("confirm", true), 7000);
      // submitPayInfo(data);
    },
    onClose: () => {
      loading.value = false;
      toast.error("Payment Cancelled", {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  });

  handler.openIframe();
}

function startPayment() {
  loading.value = true;
  const paystack = new PaystackPop();

  const amount = (permitCost.value.Total || permitCost.value['Total Fee']) + permitCost.value.ChargeFee;

  paystack.newTransaction({
    key: import.meta.env.VITE_ENV_STRING + permitCost.value.additionalInfo,
    email: userDetails.userInfo.email,
    amount: amount * 100,
    channels: channelList(amount),
    metadata: {
      paymentFor: "Permit Bill",
      applicationId: props.appID,
      appType: props.adType,
    },
    onSuccess: (transaction) => {
      console.log(transaction);
      const data = {
        reference_id: transaction.reference,
        payment_id: props.paymentID,
        type_ads: props.adType,
        payment_type: "Paystack",
      };

      // console.log(data);
      setTimeout(() => emit("confirm", true), 7000);
      // submitPayInfo(data);
    },
    onCancel: () => {
      loading.value = false;
    },
  });
}

const submitPayInfo = async (data) => {
  loading.value = true;

  console.log(data);
  try {
    const response = await axios.post("setadspaymentinfo", data);

    if (response.status === 200) {
      toast.success("Permit Payment Successful", {
        position: toast.POSITION.TOP_CENTER,
      });
      toast.success("Kindly check your mail", {
        position: toast.POSITION.TOP_CENTER,
      });

      // router.push({ name: "Overview" });
      emit("confirm", true);
    }
  } catch (error) {
    if (error.response.data.error) {
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error("Your Payment Could not be confirmed", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    // error.response.data

    // router.push({ name: "Overview" });
    emit("confirm");
  }
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
    :clickToClose="true"
  >
    <div class="border-b-2 border-dashed">
      <h4 class="px-5 py-8 text-center">Signage Fee</h4>
    </div>
    <div class="p-10">
      <div v-if="permitCost">
        <div
          v-if="permitCost.AdmininstrativeFee"
          class="flex flex-col justify-center items-center gap-5 mb-5"
        >
          <h4 class="text-sm font-medium">Administrative Fee</h4>

          <p
            v-text="formatCurrency(parseInt(permitCost.AdmininstrativeFee))"
            class="font-semibold text-2xl"
          ></p>
        </div>

        <div
          v-if="permitCost.PermitFee"
          class="flex flex-col justify-center items-center gap-5 mb-5"
        >
          <h4 class="text-sm font-medium">Permit Bill</h4>

          <p
            v-text="formatCurrency(parseInt(permitCost.PermitFee))"
            class="font-semibold text-2xl"
          ></p>
        </div>

        <div
          v-if="permitCost.LegalFee"
          class="flex flex-col justify-center items-center gap-5 mb-5"
        >
          <h4 class="text-sm font-medium">Legal Fee</h4>

          <p
            v-text="formatCurrency(parseInt(permitCost.LegalFee))"
            class="font-semibold text-2xl"
          ></p>
        </div>

        <div
          v-if="permitCost.ChargeFee"
          class="flex flex-col justify-center items-center gap-5 mb-5"
        >
          <h4 class="text-sm font-medium">Paystack Charge</h4>

          <p
            v-text="formatCurrency(permitCost.ChargeFee)"
            class="font-semibold text-2xl"
          ></p>
        </div>

        <div class="flex flex-col justify-center items-center gap-5 mb-5">
          <h4 class="text-sm font-medium" v-if="permitCost.PermitFee">
            Total Fee
          </h4>
          <h4 class="text-sm font-medium" v-else>Permit Bill</h4>

          <p
            v-text="formatCurrency(permitCost.Total || permitCost['Total Fee'])"
            class="font-semibold text-2xl"
          ></p>
        </div>
      </div>

      <!-- <p v-else class="text-center italic mt-10">
        Getting Your Application Fee
      </p> -->

      <div v-if="permitCost">
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
