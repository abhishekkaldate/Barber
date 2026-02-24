import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { CartItemProps } from '@/constants/types'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import BarberInfo from './knowbarber'

export default function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {

    const imageUrl = item.product.images[0]

    return (
        <View className='flex-row mb-4 bg-white p-3 rounded-xl'>
            <View className='w-24 h-24 rounded-xl overflow-hidden bg-gray-100'>
                <Image source={{ uri: imageUrl }} className='w-full h-full'
                    resizeMode='cover' />
            </View>

            <View className='flex-1 justify-between'>
                {/* product */}
                <View className='flex-row justify-between items-start'>
                    <View>
                        <Text className='text-primary font-medium text-sm mb-1'>{item.product.name}</Text>
                        <Text className='text-secondary text-sm'>FadeSize: {item.size}</Text>
                    </View>
                    <TouchableOpacity onPress={onRemove}>
                        <Ionicons name='close-circle-outline' size={20} color="#FF4C3B" />
                    </TouchableOpacity>
                </View>

                {/* price */}
                {/* <View className='flex-row justify-between items-center mt-2'>
            <Text className='text-primary font-bold text-base'>₹{item.product.price.toFixed(2)}</Text>

            <View className='flex-row items-center bg-surface rounded-full px-2 py-1'>
                <TouchableOpacity className='p-1'
                onPress={()=> onUpdateQuantity && onUpdateQuantity(item.quantity -1)}>
                    <Ionicons name='remove' size={17} color={COLORS.primary}/>
                </TouchableOpacity>

                <TouchableOpacity className='p-1'
                onPress={()=> onUpdateQuantity && onUpdateQuantity(item.quantity +1)}>
                    <Ionicons name='add' size={17} color={COLORS.primary}/>
                </TouchableOpacity>

            </View>
                <TouchableOpacity>
                    <View className='px-3 py-1'>
                    <BarberInfo/>
                    </View>
                </TouchableOpacity>


            
        </View> */}


                {/* Price + Quantity */}
                <View className="mt-3">

                    {/* Row 1 → Price & Qty */}
                    <View className="flex-row justify-between items-center">
                        <Text className="text-primary font-bold text-lg">
                            ₹{item.product.price}
                        </Text>

                        <View className="mt-0">
                            <BarberInfo />
                        </View>

                        <Text className='text-primary font-medium mx-3'>{item.quantity}</Text>


                        {/* <View className="flex-row items-center bg-gray-200 px-3 py-1 rounded-full">
    <View className="mt-0">
    <BarberInfo />
  </View>
      <TouchableOpacity className="px-2">
        <Ionicons name="remove" size={18} />
      </TouchableOpacity>

      <Text className="px-2">{item.quantity}</Text>

      <TouchableOpacity className="px-2">
        <Ionicons name="add" size={18} />
      </TouchableOpacity>
    </View> */}
                    </View>
              </View>
            </View>
        </View>
    )
}