import { useState } from 'react';
// components
import ButtonPrimary from '../ui/button-primary';
import LabelForm from '../ui/form/label-form';
import InputForm from '../ui/form/input-form';
import SelectForm from '../ui/form/select-form';
import ErrorFieldForm from '../ui/form/error-field-form';
// context
import { useTracking } from '../../context/tracking';

const apiKey = process.env.NEXT_PUBLIC_APIKEY_BINDERBYTE;
const binderbyteUrl = process.env.NEXT_PUBLIC_BINDERBYTE_URL;
const notAwb = 'Nomor resi tidak boleh kosong';
const notCourier = 'Pilih kurir terlebih dahulu';

export default function Form({ listCourier }) {
  // state
  const [errors, setErrors] = useState({ courier: '', awb: '' });
  const [form, setForm] = useState({ courier: '', awb: '' });

  // context
  const { setTracking, setError } = useTracking();

  // handle select courier change
  const handleCourier = (e) => {
    if (!e.target.value) {
      setErrors((prevState) => ({
        ...prevState,
        courier: notCourier,
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        courier: '',
      }));
    }

    setForm((prevState) => ({
      ...prevState,
      courier: e.target.value,
    }));
  };

  // handle input awb change
  const handleAwb = (e) => {
    if (!e.target.value) {
      setErrors((prevState) => ({
        ...prevState,
        awb: notAwb,
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        awb: '',
      }));
    }

    setForm((prevState) => ({
      ...prevState,
      awb: e.target.value,
    }));
  };

  // handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.awb) {
      setErrors((prevState) => ({
        ...prevState,
        awb: notAwb,
      }));
    }

    if (!form.courier) {
      return setErrors((prevState) => ({
        ...prevState,
        courier: notCourier,
      }));
    }

    const { courier, awb } = form;
    const res = await fetch(
      `${binderbyteUrl}/track?api_key=${apiKey}&courier=${courier}&awb=${awb}`,
    );
    const { data = {}, status, message } = await res.json();

    setTracking({
      type: 'GET_TRACKING',
      payload: data,
    });
    setError({
      type: 'GET_ERROR',
      payload: { status, message },
    });
  };

  // return components
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-center p-4 w-full md:w-10/12 lg:w-8/12"
    >
      <div className="flex-auto md:flex-initial order-1 mb-4 md:mb-0">
        <LabelForm text="Kurir" htmlFor="courier" />
        <SelectForm
          id="courier"
          name="courier"
          className={`w-full ${errors.courier ? 'border-red-500' : ''}`}
          textOptionDefault="Pilih Kurir"
          onChange={handleCourier}
        >
          {Array.isArray(listCourier) &&
            listCourier.map((courier, index) => {
              const { description, code } = courier;

              return (
                <option key={index} value={code}>
                  {description}
                </option>
              );
            })}
        </SelectForm>
      </div>
      <div className="flex-auto md:flex-1 order-2">
        <LabelForm text="Nomor Resi" htmlFor="awb" />
        <InputForm
          id="awb"
          name="awb"
          placeholder="Masukan nomor resi"
          onChange={handleAwb}
          value={form.awb}
          className={`w-full ${errors.awb ? 'border-red-500' : ''}`}
        />
      </div>
      {errors.awb && (
        <ErrorFieldForm text={errors.awb} className="order-3 md:order-last" />
      )}
      {errors.courier && (
        <ErrorFieldForm
          text={errors.courier}
          className="order-3 md:order-last"
        />
      )}
      <ButtonPrimary
        text="Cari"
        type="submit"
        className="order-last md:order-3 w-full md:w-auto my-6 md:my-0"
      />
    </form>
  );
}
