import React, { useState, useEffect } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { Progress } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedCurrency } from 'vtex.format-currency'
import { FreeShippingProps } from '../../typings/free-shipping'


/**
 * Modifiers of each of the component classes allow you to style each of the blocks
 */
const CSS_HANDLES = [
    "globalFreeShippingContainer",
    "informativeFreeShippingText",
    "freeShippingProgressBar",
    "rangeFreeShippingContainer",
    "initialRangeFreeShippingText",
    "endRangeFreeShippingText"
] as const


const FreeShipping: StorefrontFunctionComponent<FreeShippingProps> = ({ valueOfFreeShipping, infoLabel }) => {

    // Get subTotal of my cart that is equal to the sum of the prices of the items in the cart
    const { orderForm: { totalizers } } = useOrderForm()
    let subTotal = totalizers.length === 0 ? 0 : totalizers[0].value

    const [missingForFreeShipping, setMissingForFreeShipping] = useState(0)
    const [percentageForFreeShipping, setPercentageForFreeShipping] = useState(1)

    useEffect(() => {
        setMissingForFreeShipping(valueOfFreeShipping - subTotal <= 0 ? 0 : valueOfFreeShipping - subTotal)
        setPercentageForFreeShipping((subTotal * 100) /valueOfFreeShipping > 100 ? 100 : (subTotal * 100) /valueOfFreeShipping)
    }, [subTotal])

    const handles = useCssHandles(CSS_HANDLES)

    return (
        <div style = {{ display: 'flex', flexWrap:'wrap', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginLeft: '1rem'}}  className = {handles.globalFreeShippingContainer}>
            <p className = {`t-code mw9 ${handles.informativeFreeShippingText}`}> 
                {infoLabel.labelInitial} <FormattedCurrency value = {subTotal} /> &nbsp;
                {infoLabel.labelBetween} <FormattedCurrency value = {missingForFreeShipping} /> {infoLabel.labelFinal} &nbsp;
            </p>
            <Progress type = "line" percent = {percentageForFreeShipping}  className = {handles.freeShippingProgressBar}/>
            <div style = {{ display: 'flex', flexWrap:'wrap', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginLeft: '0.1rem'}}  className = {handles.rangeFreeShippingContainer}>
                <p className = {`t-code mw9 ${handles.initialRangeFreeShippingText}`}> <FormattedCurrency value = {0} /> </p>
                <p className = {`t-code mw9 ${handles.endRangeFreeShippingText}`}> <FormattedCurrency value = {valueOfFreeShipping} /> </p>
            </div>
        </div>
    )
}


FreeShipping.defaultProps = {
    valueOfFreeShipping: 1,
    infoLabel: {
        labelInitial: "Valor actual:",
        labelBetween: "¡Faltan ",
        labelFinal: "para que su envío sea totalmente gratis!"
    }
}


FreeShipping.schema = {
  title: 'admin/editor.free-shipping.title',
  description: 'admin/editor.free-shipping.description',
  type: 'object',
  properties: {
    valueOfFreeShipping: {
        title: "admin/editor.free-shipping.valueOfFreeShipping.title",
        type: "number"
    },
    infoLabel: {
        title: "",
        type: "object",
        properties: {
            labelInitial: {
                title: "admin/editor.free-shipping.infoLabel.labelInitial.title",
                type: "string"
            },
            labelBetween: {
                title: "admin/editor.free-shipping.infoLabel.labelBetween.title",
                type: "string"
            },
            labelFinal: {
                title: "admin/editor.free-shipping.infoLabel.labelFinal.title",
                type: "string"
            }
        }
    }
  }
}

export default FreeShipping