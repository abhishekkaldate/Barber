import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'expo-router'
import { Address } from '@/constants/types'
import { dummyAddress } from '@/assets/assets'
import Toast from 'react-native-toast-message'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '@/constants'
import Header from '@/components/header'
import { Ionicons } from '@expo/vector-icons'

export default function Checkout() {

const {cartTotal} = useCart()
const router = useRouter()

const [loading, setLoading] = useState(false)
const [pageLoading, setPageLoading] = useState(true)

const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
const [paymentMethod, setPaymentMethod] = useState<'cash' | 'stripe' | null>('cash')

const shipping = 50;
const tax = 10;
const total = cartTotal + shipping + tax;

const fetchAddress = async () => {
    const addrList = dummyAddress;
    if(addrList.length > 0) {
        //find first
        const def = addrList.find((a: any)=> a.isDefault) || addrList[0]
        setSelectedAddress(def as Address)
    }
    setPageLoading(false)
}

const handlePlaceOrder = async () => {
    if(!selectedAddress) {
        Toast.show({
            type: 'error',
            text1: 'No address selected',
            text2: 'Please select a Home shipping address before placing your order.'
        })
        return;
    }
    if(paymentMethod === 'stripe') 
        return Toast.show({
            type: 'error',
            text1: 'Payment method not supported',
            text2: 'Stripe payment method is not supported yet. Please select Cash on Delivery.'
        })
        //cash
    router.replace('/orders')
}

useEffect(()=>{
    fetchAddress()
},[])

if(pageLoading) {
    return (
        <SafeAreaView className='flex-1 bg-surface justify-center items-center'>
            <ActivityIndicator size="large" color={COLORS.primary}/>
        </SafeAreaView>
    )
}

  return (
    <SafeAreaView className='flex-1 bg-surface' edges={['top']}>
        <Header title='Checkout' showBack/>

        <ScrollView className='flex-1 px-4 mt-4'>
            {/* Address */}
                <Text className='text-lg font-bold text-primary mb-4'>Your Home Address</Text>
                {selectedAddress ? (
                    <View className='bg-white p-4 rounded-xl mb-6 shadow-sm'>
                        <View className='flex-row items-center justify-between mb-2'>
                            <Text className='text-base font-bold'>{selectedAddress.type}</Text>
                            <TouchableOpacity
                            onPress={()=> router.push('/addresses')}>
                            <Text className='text-accent text-sm'>Change Address</Text>
                            </TouchableOpacity>
                        </View>
                        <Text className='text-secondary leading-5'>
                            {selectedAddress.street}, {selectedAddress.city}
                            {'\n'}
                             {selectedAddress.state} {selectedAddress.zipCode}
                             {'\n'}
                             {selectedAddress.country}
                        </Text>
                    </View>


                ) : (
                    <TouchableOpacity onPress={()=> router.push('/addresses')}
                    className='bg-white p-6 rounded-xl mb-6 items-center justify-center border-dashed border-2 border-gray-100'>
                        <Text className='text-primary font-bold'>Add Address</Text>
                    </TouchableOpacity>
                )}

                {/* Payment Method */}
                <Text className='text-lg font-bold text-primary mb-4'>Payment Method</Text>


                {/* cash */}
                <TouchableOpacity 
                onPress={()=> setPaymentMethod('cash')}
                className={`flex-row items-center bg-white p-4 rounded-xl mb-4 border-2 ${paymentMethod === 'cash' ? 'border-primary' : 'border-transparent'}`}>
                    <Ionicons name='cash-outline' size={24} color={COLORS.primary} className='mr-3'/>
                    <View className='ml-3 flex-1'>
                        <Text className='text-base font-bold text-primary'>Pay Cash On Arrival</Text>
                        <Text className='text-secondary text-xs mt-1'>When Barber At Home Then Pay...</Text>
                    </View>
                    {paymentMethod === 'cash' && <Ionicons name='checkmark-circle' size={24} color={COLORS.primary}/>}
                </TouchableOpacity>

                {/* stripe */}
                <TouchableOpacity 
                onPress={()=> setPaymentMethod('stripe')}
                className={`flex-row items-center bg-white p-4 rounded-xl mb-4 border-2 ${paymentMethod === 'stripe' ? 'border-primary' : 'border-transparent'}`}>
                    <Ionicons name='card-outline' size={24} color={COLORS.primary} className='mr-3'/>
                    <View className='ml-3 flex-1'>
                        <Text className='text-base font-bold text-primary'>Pay With Stripe/Card</Text>
                        <Text className='text-secondary text-xs mt-1'>Credit or Debit Card</Text>
                    </View>
                    {paymentMethod === 'stripe' && <Ionicons name='checkmark-circle' size={24} color={COLORS.primary}/>}
                </TouchableOpacity>
        </ScrollView>

        {/* order */}
        <View className='p-4 bg-white shaodow-lg border-t border-gray-100'>
            <Text className='text-lg font-bold text-primary mb-4'>Order Summery</Text>

            {/* subtotal */}
            <View className='flex-row items-center justify-between mb-2'>
                <Text className='text-secondary'>SubTotal</Text>
                <Text className='font-bold'>₹{cartTotal.toFixed(2)}</Text>
            </View>

            {/* Tax */}
            <View className='flex-row items-center justify-between mb-2'>
                <Text className='text-secondary'>Tax</Text>
                <Text className='font-bold'>₹{tax.toFixed(2)}</Text>
            </View>

            {/* Shipping */}
            <View className='flex-row items-center justify-between mb-4'>
                <Text className='text-secondary'>Shipping</Text>
                <Text className='font-bold'>₹{shipping.toFixed(2)}</Text>
            </View>

            {/* Total */}
            <View className='flex-row items-center justify-between mb-6'>
                <Text className='text-primary font-bold'>Total</Text>
                <Text className='text-primary font-bold text-lg'>₹{total.toFixed(2)}</Text>
            </View>

            {/* placeorder */}
            <TouchableOpacity
            className={`p-4 rounded-xl items-center justify-center ${loading ? 'bg-gray-400' : 'bg-primary'}`}
            onPress={handlePlaceOrder}
            disabled={loading}>
                {loading ? <ActivityIndicator color='white'/> : <Text className='text-white font-bold text-lg'>Confirm Booking</Text>}
                
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}
