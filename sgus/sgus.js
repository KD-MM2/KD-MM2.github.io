(function($) {
    // var g = function(a) {
    //     var b = this;
    //     b.$form = a;
    //     b.$products = a.find('.salesgen-upsell-item-list');
    //     b.loading = true;
    //     b.$form.off('.sg-bundle-form');
    //     a.on('init_bundle.sg-bundle-form', {
    //         bundleForm: b
    //     }, b.onInit);
    //     a.on('update_variation_values.sg-bundle-form', {
    //         bundleForm: b
    //     }, b.onUpdateAttributes);
    //     a.on('click.sg-bundle-form', '.salesgen-add-bundle', {
    //         bundleForm: b
    //     }, b.onAddToCart);
    //     setTimeout(function() {
    //         a.trigger('init_bundle');
    //         b.loading = false
    //     }, 50);
    //     jQuery('body').on('change', '.salesgen-upsell-item-list input, .salesgen-upsell-item-list select, .salesgen-upsell-item-list textarea', function(e) {
    //         let $elm = $(this).closest('.salesgen-upsell-item-list');
    //         $elm.trigger('custom_options')
    //     })
    // };
    // g.prototype.onInit = function(a) {
    //     var b = a.data.bundleForm;
    //     b.$products.map(function() {
    //         new h($(this), b)
    //     });
    //     b.$form.trigger('update_variation_values')
    // };
    // g.prototype.isValid = function() {
    //     if (this.$form.data('submitting') == 1) {
    //         if (typeof this.$form[0]['checkValidity'] == 'function' && !this.$form[0].checkValidity()) {
    //             this.$form.find(".sg-is-invalid").removeClass('sg-is-invalid sgshake');
    //             this.$form.find("select:invalid").addClass('sg-is-invalid sgshake');
    //             this.$form.find("input:invalid").addClass('sg-is-invalid sgshake');
    //             return false
    //         }
    //         if (this.$form.find('.woocommerce-invalid').length > 0) {
    //             return false
    //         }
    //         if (this.$form.find('.wcpa_validation_error').length > 0) {
    //             return false
    //         }
    //         let variation = this.$form.find('[name=variation_id]');
    //         if (variation.length > 0 && variation.val() == "") {
    //             return false
    //         }
    //         return true
    //     }
    //     return false
    // };
    // g.prototype.onAddToCart = function(b) {
    //     var c = b.data.bundleForm;
    //     let btn_elm = $(this), formData = new FormData(), wrp_elm = c.$form, bundle_form = wrp_elm.find('#salesgen-add-bundle-form'), products = [];
    //     c.$form.find('.input-text, select, input:checkbox').trigger('validate');
    //     sgupsell.cart_bundle_info(wrp_elm);
    //     let selected_items = bundle_form.find('.salesgen-upsell-item-list-selected');
    //     c.$form.data('submitting', 1);
    //     if (c.isValid()) {
    //         btn_elm.addClass('sgloading');
    //         selected_items.each(function(a) {
    //             let elm = $(this), product_id = elm.data('parent'), cart_info = elm.data('cart');
    //             elm.find('input[type=file]').each(function() {
    //                 let __t = $(this), fname = __t.attr('name');
    //                 if (__t.val() != '') {
    //                     formData.append(product_id + '_' + fname, this.files[0])
    //                 }
    //             });
    //             products.push(cart_info)
    //         });
    //         formData.append('action', 'sg_woo_ajax_add_to_cart');
    //         formData.append('products', JSON.stringify(products));
    //         $.ajax({
    //             url: sgbmsmcfg.ajax_url + '?' + Math.random(),
    //             data: formData,
    //             type: 'POST',
    //             contentType: false,
    //             processData: false,
    //             success: function(a) {
    //                 btn_elm.removeClass('sgloading loading');
    //                 if (a.error && a.product_url != '') {
    //                     window.location = a.product_url;
    //                     return
    //                 } else {
    //                     if (sgbmsmcfg.options.salesgen_upsell_popup_enable == "yes") {
    //                         if (typeof a.fragments['go_to_cart'] !== 'undefined') {
    //                             window.location = sgbmsmcfg.cart_url;
    //                             return
    //                         }
    //                         sgupsell.add_to_cart_popup(a)
    //                     } else {
    //                         window.location = sgbmsmcfg.cart_url
    //                     }
    //                 }
    //             },
    //             error: function() {
    //                 alert('Please check your internet connection then try again.')
    //             }
    //         })
    //     } else {
    //         setTimeout(function() {
    //             $('.sgshake').removeClass('sgshake')
    //         }, 2000)
    //     }
    // };
    // g.prototype.onUpdateAttributes = function(a) {
    //     var b = a.data.bundleForm;
    //     sgupsell.calc_price_bmsm(b.$form);
    //     sgupsell.cart_bundle_info(b.$form)
    // };
    var h = function(a, b) {
        var c = this;
        c.$elm = a;
        c.$bundleForm = b;
        c.$attributeFields = a.find('.salesgen-upsell-options select');
        c.$product = a.closest('.salesgen-upsell-item-list');
        c.$selectOptions = a.find('.sgbmsm-price-checkbox-wrp');
        c.variationsData = a.data('variants');
        c.$attributeFields = a.find('select[name^=attribute]');
        c.$customOptions = a.find('.wcpa_form_item, .sg-ppo-field-input');
        c.getChosenAttributes = c.getChosenAttributes.bind(c);
        c.findMatchingVariations = c.findMatchingVariations.bind(c);
        c.isMatch = c.isMatch.bind(c);
        c.updatePriceHtml = c.updatePriceHtml.bind(c);
        if (typeof c.variationsData == 'string' && c.variationsData.indexOf('%7B') == 0) {
            c.variationsData = JSON.parse(decodeURIComponent(c.variationsData))
        }
        a.on('change', '[name^=attribute]', {
            bundleItem: c
        }, c.onAttributeValueChange);
        a.on('change', '.salesgen-upsell-item-checkbox', {
            bundleItem: c
        }, c.onCheckboxChange);
        a.on('check_variations.salesgen-upsell-item-list', {
            bundleItem: c
        }, c.onFindVariation);
        a.on('found_variation.salesgen-upsell-item-list', {
            bundleItem: c
        }, c.onFoundVariation);
        a.on('custom_options.salesgen-upsell-item-list', {
            bundleItem: c
        }, c.onCustomOptionsChange);
        c.$elm.on('input validate change', '.input-text, select, input:checkbox, input[type="text"]', c.validateField);
        c.$customOptions.each(function() {
            let _that = $(this);
            _that.find('input, select, textarea').on('change', function(e) {
                a.trigger('custom_options')
            })
        });
        setTimeout(function() {
            let display_total = c.$attributeFields.length, wpca_items = c.$elm.find('.wcpa_form_item');
            if (wpca_items.length > 0) {
                display_total += wpca_items.length;
                wpca_items.each(function() {
                    let _that = $(this);
                    if (_that.css('display') == 'none' || _that.hasClass('wcpa_type_paragraph')) display_total--
                })
            }
            if (display_total < sgbmsmcfg.options.salesgen_upsell_bundle_hide_options_when) {
                c.$selectOptions.removeClass('active-select-options')
            }
            a.trigger('check_variations');
            if (wpca_items.length > 0) {
                wpca_items.find('input:first-child, select:first-child, textarea:first-child, [required="required"]').trigger('change')
            }
        }, 50)
    };
    h.prototype.validateField = function(e) {
        var a = $(this),
            $parent = a.closest('.form-row'),
            validated = true,
            validate_required = $parent.is('.validate-required, [required="required"]'),
            validate_email = $parent.is('.validate-email'),
            validate_phone = $parent.is('.validate-phone'),
            pattern = '',
            event_type = e.type;
        if ('input' === event_type) {
            $parent.removeClass('woocommerce-invalid woocommerce-invalid-required-field woocommerce-invalid-email woocommerce-invalid-phone woocommerce-validated');
            a.removeClass('sg-is-invalid sgshake')
        }
        if ('validate' === event_type || 'change' === event_type) {
            if (validate_required) {
                if ('checkbox' === a.attr('type') && !a.is(':checked')) {
                    $parent.removeClass('woocommerce-validated').addClass('woocommerce-invalid woocommerce-invalid-required-field');
                    a.addClass('sg-is-invalid sgshake');
                    validated = false
                } else if (a.val() === '') {
                    $parent.removeClass('woocommerce-validated').addClass('woocommerce-invalid woocommerce-invalid-required-field');
                    a.addClass('sg-is-invalid sgshake');
                    validated = false
                }
            }
            if (validate_email) {
                if (a.val()) {
                    pattern = new RegExp(/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i);
                    if (!pattern.test(a.val())) {
                        $parent.removeClass('woocommerce-validated').addClass('woocommerce-invalid woocommerce-invalid-email woocommerce-invalid-phone');
                        a.addClass('sg-is-invalid sgshake');
                        validated = false
                    }
                }
            }
            if (validate_phone) {
                pattern = new RegExp(/[\s\#0-9_\-\+\/\(\)\.]/g);
                if (0 < a.val().replace(pattern, '').length) {
                    $parent.removeClass('woocommerce-validated').addClass('woocommerce-invalid woocommerce-invalid-phone');
                    a.addClass('sg-is-invalid sgshake');
                    validated = false
                }
            }
            if (validated) {
                $parent.removeClass('woocommerce-invalid woocommerce-invalid-required-field woocommerce-invalid-email woocommerce-invalid-phone').addClass('woocommerce-validated');
                a.removeClass('sg-is-invalid sgshake')
            }
        }
    };
    h.prototype.onAttributeValueChange = function(a) {
        a.preventDefault();
        var b = a.data.bundleItem,
            elm = $(this);
        elm.removeClass('sg-is-invalid sgshake');
        b.$elm.find('input[name="variation_id"], input.variation_id').val('').trigger('change');
        b.$elm.find('.wc-no-matching-variations').remove();
        b.$elm.trigger('check_variations')
    };
    h.prototype.onCustomOptionsChange = function(a) {
        a.preventDefault();
        var b = a.data.bundleItem,
            elm = b.$elm;
        setTimeout(function() {
            let wcpa_outer = b.$elm.find('.wcpa_form_outer'), base_price = elm.data('base-price'), total_price = elm.data('base-price'), pricewp = null;
            if (wcpa_outer.get(0)) {
                let wcpa_data = wcpa_outer.data('wcpa'), rules = wcpa_outer.data('rules');
                if (rules.pric_overide_base_price_fully) total_price = 0;
                if (rules.pric_overide_base_price_if_gt_zero) total_price = 0;
                if (rules.pric_overide_base_price) total_price = 0;
                if (typeof wcpa_data != 'undefined' && typeof wcpa_data['price'] != 'undefined') {
                    total_price = (wcpa_data.price.options != NaN) ? wcpa_data.price.options + total_price * 1 : total_price * 1;
                    if (rules.pric_overide_base_price_if_gt_zero) {
                        if (wcpa_data.price.options != NaN && base_price < wcpa_data.price.options) {
                            total_price = wcpa_data.price.options
                        } else total_price = base_price
                    }
                }
                if (total_price !== NaN) {
                    let price_html = sgupsell.wc_price_html(total_price);
                    elm.find('.sgbmsm-price-checkbox').html(price_html);
                    elm.data('price', total_price);
                    b.$bundleForm.$form.trigger('update_variation_values')
                }
            }
        }, 50)
    };
    h.prototype.getChosenAttributes = function() {
        let data = {};
        let count = 0;
        let chosen = 0;
        this.$attributeFields.each(function() {
            let attribute_name = $(this).data('attribute_name') || $(this).attr('name');
            let value = $(this).val() || '';
            if (value.length > 0) {
                chosen++
            }
            count++;
            data[attribute_name] = value
        });
        return {
            'count': count,
            'chosenCount': chosen,
            'data': data
        }
    };
    h.prototype.onFindVariation = function(b, c) {
        var d = b.data.bundleItem,
            attributes = 'undefined' !== typeof c ? c : d.getChosenAttributes(),
            currentAttributes = attributes.data;
        if (attributes.count && attributes.count === attributes.chosenCount) {
            let variations = [];
            Object.keys(d.variationsData).map(function(a) {
                variations.push(d.variationsData[a])
            });
            let matching_variations = d.findMatchingVariations(variations, currentAttributes), variation = matching_variations.shift();
            if (variation) {
                d.$elm.trigger('found_variation', [variation])
            } else {
                d.$elm.trigger('reset_data');
                attributes.chosenCount = 0;
                if (!d.loading) {
                    d.$elm.find('.sgbmsm-price-checkbox').after('<p class="wc-no-matching-variations woocommerce-info">' + wc_add_to_cart_variation_params.i18n_no_matching_variations_text + '</p>');
                    d.$elm.find('.wc-no-matching-variations').slideDown(200)
                }
            }
        }
    };
    h.prototype.findMatchingVariations = function(a, b) {
        let matching = [];
        for (var i = 0; i < a.length; i++) {
            let variation = a[i];
            if (this.isMatch(variation.attributes, b)) {
                matching.push(variation)
            }
        }
        return matching
    };
    h.prototype.isMatch = function(a, b) {
        let match = true;
        for (var c in a) {
            if (a.hasOwnProperty(c)) {
                let val1 = a[c];
                let val2 = b[c];
                if (val1 !== undefined && val2 !== undefined && val1.length !== 0 && val2.length !== 0 && val1 !== val2) {
                    match = false
                }
            }
        }
        return match
    };
    h.prototype.updatePriceHtml = function(a) {
        this.$elm.find('.sgbmsm-price-checkbox').html(a)
    };
    h.prototype.onFoundVariation = function(a, b) {
        let bundle = a.data.bundleItem;
        bundle.$elm.data('id', b.variation_id);
        bundle.$elm.data('price', b.price);
        bundle.updatePriceHtml(decodeURIComponent(b.price_html));
        sgupsell.wcpa_price(bundle.$elm);
        bundle.$elm.find('input[name="variation_id"], input.variation_id').val(b.variation_id).trigger('change');
        bundle.$bundleForm.$form.trigger('update_variation_values')
    };
    h.prototype.onCheckboxChange = function(a) {
        a.preventDefault();
        let bundle = a.data.bundleItem, elm = $(this), bundleForm = bundle.$bundleForm;
        affect = elm.data('change'), affect_elm = bundle.$bundleForm.$form.find(affect), checked = affect_elm.hasClass('salesgen-upsell-selected');
        if (!checked) {
            affect_elm.css({
                display: 'block'
            })
        } else {
            setTimeout(function() {
                affect_elm.css({
                    display: 'none'
                })
            }, 100)
        }
        affect_elm.toggleClass('salesgen-upsell-selected');
        bundle.$product.toggleClass('salesgen-upsell-item-list-selected');
        bundle.$bundleForm.$form.trigger('update_variation_values')
    };
    var j = function(a) {
        let self = this;
        self.$form = a;
        self.$btn = a.find('.single_add_to_cart_button:not(#sn-quick-buynow)');
        self.$formData = new FormData(a[0]);
        self.isValid = self.isValid.bind(self);
        a.on('submit', {
            postUpsell: self
        }, self.onSubmit);
        a.on('input validate change', '.input-text, select, input:checkbox', self.validateField)
    };
    j.prototype.validateField = function(e) {
        let $this = $(this), $parent = $this.closest('.form-row');
        if ($parent.length == 0) return;
        let validated = true, validate_required = $parent.is('.validate-required'), validate_email = $parent.is('.validate-email'), validate_phone = $parent.is('.validate-phone'), pattern = '', event_type = e.type;
        if ('input' === event_type) {
            $parent.removeClass('woocommerce-invalid woocommerce-invalid-required-field woocommerce-invalid-email woocommerce-invalid-phone woocommerce-validated');
            $this.removeClass('sg-is-invalid sgshake')
        }
        if ('validate' === event_type || 'change' === event_type) {
            if (validate_required) {
                if ('checkbox' === $this.attr('type') && !$this.is(':checked')) {
                    $parent.removeClass('woocommerce-validated').addClass('woocommerce-invalid woocommerce-invalid-required-field');
                    $this.addClass('sg-is-invalid sgshake');
                    validated = false
                } else if ($this.val() === '') {
                    $parent.removeClass('woocommerce-validated').addClass('woocommerce-invalid woocommerce-invalid-required-field');
                    $this.addClass('sg-is-invalid sgshake');
                    validated = false
                }
            }
            if (validate_email) {
                if ($this.val()) {
                    pattern = new RegExp(/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i);
                    if (!pattern.test($this.val())) {
                        $parent.removeClass('woocommerce-validated').addClass('woocommerce-invalid woocommerce-invalid-email woocommerce-invalid-phone');
                        $this.addClass('sg-is-invalid sgshake');
                        validated = false
                    }
                }
            }
            if (validate_phone) {
                pattern = new RegExp(/[\s\#0-9_\-\+\/\(\)\.]/g);
                if (0 < $this.val().replace(pattern, '').length) {
                    $parent.removeClass('woocommerce-validated').addClass('woocommerce-invalid woocommerce-invalid-phone');
                    $this.addClass('sg-is-invalid sgshake');
                    validated = false
                }
            }
            if (validated) {
                $parent.removeClass('woocommerce-invalid woocommerce-invalid-required-field woocommerce-invalid-email woocommerce-invalid-phone').addClass('woocommerce-validated');
                $this.removeClass('sg-is-invalid sgshake')
            }
        }
    };
    j.prototype.onSubmit = function(c) {
        c.preventDefault();
        let upsell = c.data.postUpsell;
        upsell.$form.find('.input-text, select, input:checkbox').trigger('validate');
        if (upsell.$btn.is('.disabled')) {
            alert('Please select some product options before adding this product to your cart.');
            upsell.$btn.removeClass('sgloading loading');
            return false
        }
        upsell.$formData = new FormData(upsell.$form[0]);
        upsell.$form.data('submitting', 1);
        if (upsell.isValid()) {
            upsell.$btn.addClass('sgloading');
            upsell.$formData.append('action', 'sg_woo_ajax_add_to_cart');
            if (!upsell.$formData.has('product_id')) {
                let product_id = upsell.$btn.val();
                upsell.$formData.append('product_id', product_id)
            }
            upsell.$formData.delete('add-to-cart');
            $.ajax({
                url: sgbmsmcfg.ajax_url + '?' + Math.random(),
                data: upsell.$formData,
                type: 'POST',
                contentType: false,
                processData: false,
                success: function(b) {
                    upsell.$form.data('submitting', '');
                    upsell.$btn.removeClass('sgloading loading');
                    if (b.error && b.product_url != '') {
                        window.location = b.product_url;
                        return
                    } else {
                        if (sgbmsmcfg.options.salesgen_upsell_popup_enable == "yes") {
                            if (typeof b.fragments['go_to_cart'] !== 'undefined') {
                                window.location = sgbmsmcfg.cart_url;
                                return
                            }
                            sgupsell.add_to_cart_popup(b)
                        } else {
                            window.location = sgbmsmcfg.cart_url
                        } if (typeof jQuery['wcpaInit'] == 'function') {
                            jQuery.wcpaInit();
                            jQuery.wcpaIterate()
                        }
                        if (("undefined" != typeof ga) && ("undefined" != b.fragments["sg_ga_label"])) {
                            ga('send', 'event', 'Products', 'Add to Cart', b.fragments.sg_ga_label)
                        }
                        if (("undefined" != typeof fbq) && ("undefined" != b.fragments["sg_fb_events"])) {
                            if (typeof b.fragments["sg_fb_events"] == 'object') {
                                Object.keys(b.fragments.sg_fb_events).map(function(a) {
                                    fbq('track', 'AddToCart', b.fragments.sg_fb_events[a])
                                })
                            }
                        }
                    }
                },
                error: function() {
                    alert('Please check your internet connection then try again.')
                }
            })
        } else {
            setTimeout(function() {
                upsell.$btn.removeClass('sgloading loading')
            }, 100);
            setTimeout(function() {
                $('.sgshake').removeClass('sgshake')
            }, 2000)
        }
        upsell.$form.data('submitting', '');
        return false
    };
    j.prototype.isValid = function() {
        if (this.$form.data('submitting') == 1) {
            if (typeof this.$form[0]['checkValidity'] == 'function' && !this.$form[0].checkValidity()) {
                this.$form.find(".sg-is-invalid").removeClass('sg-is-invalid sgshake');
                this.$form.find("select:invalid").addClass('sg-is-invalid sgshake');
                this.$form.find("input:invalid").addClass('sg-is-invalid sgshake');
                return false
            }
            if (this.$form.find('.woocommerce-invalid').length > 0) {
                return false
            }
            let variation = this.$form.find('[name=variation_id]');
            if (variation.length > 0 && variation.val() == "") {
                return false
            }
            return true
        }
        return false
    };
    var k = function(a) {
        var b = this;
        b.$elm = a;
        b.$form = a.find('form');
        b.$btn = a.find('.sg_single_add_to_cart_button');
        b.$attributeFields = a.find('.salesgen-upsell-options select');
        b.$product = a.closest('.salesgen-upsell-item-list');
        b.variationsData = a.data('variants');
        b.$attributeFields = a.find('select[name^=attribute]');
        b.$customOptions = a.find('.wcpa_form_item, .sg-ppo-field-input');
        b.getChosenAttributes = b.getChosenAttributes.bind(b);
        b.findMatchingVariations = b.findMatchingVariations.bind(b);
        b.isMatch = b.isMatch.bind(b);
        b.updatePriceHtml = b.updatePriceHtml.bind(b);
        b.onSubmit = b.onSubmit.bind(b);
        if (typeof b.variationsData == 'string' && b.variationsData.indexOf('%7B') == 0) {
            b.variationsData = JSON.parse(decodeURIComponent(b.variationsData))
        }
        a.on('change', '[name^=attribute]', {
            upsellItem: b
        }, b.onAttributeValueChange);
        a.on('check_variations.salesgen-upsell-item', {
            upsellItem: b
        }, b.onFindVariation);
        a.on('found_variation.salesgen-upsell-item', {
            upsellItem: b
        }, b.onFoundVariation);
        a.on('custom_options.salesgen-upsell-item', {
            upsellItem: b
        }, b.onCustomOptionsChange);
        b.$form.on('input validate change', '.input-text, select, input:checkbox', b.validateField);
        b.$customOptions.each(function() {
            let _that = $(this);
            _that.find('input, select, textarea').on('change', function(e) {
                b.$form.trigger('custom_options')
            })
        });
        setTimeout(function() {
            let wpca_items = b.$elm.find('.wcpa_form_item');
            a.trigger('check_variations');
            if (wpca_items.length > 0) {
                wpca_items.find('input:first-child, select:first-child, textarea:first-child').trigger('change')
            }
        }, 100);
        b.$btn.off().on('click', {
            upsellItem: b
        }, b.onSubmit)
    };
    k.prototype.onAttributeValueChange = function(a) {
        a.preventDefault();
        let upsell = a.data.upsellItem, elm = $(this);
        elm.removeClass('sg-is-invalid sgshake');
        upsell.$elm.find('input[name="variation_id"], input.variation_id').val('').trigger('change');
        upsell.$elm.find('.wc-no-matching-variations').remove();
        upsell.$elm.trigger('check_variations')
    };
    k.prototype.onCustomOptionsChange = function(a) {
        a.preventDefault();
        let upsell = a.data.upsellItem, elm = upsell.$elm;
        setTimeout(function() {
            let wcpa_outer = upsell.$elm.find('.wcpa_form_outer'), base_price = elm.data('base-price'), total_price = elm.data('base-price'), pricewp = null;
            if (wcpa_outer.get(0)) {
                let wcpa_data = wcpa_outer.data('wcpa'), rules = wcpa_outer.data('rules');
                if (rules.pric_overide_base_price_fully) total_price = 0;
                if (rules.pric_overide_base_price_if_gt_zero) total_price = 0;
                if (rules.pric_overide_base_price) total_price = 0;
                if (typeof wcpa_data != 'undefined' && typeof wcpa_data['price'] != 'undefined') {
                    total_price = (wcpa_data.price.options != NaN) ? wcpa_data.price.options + total_price * 1 : total_price * 1;
                    if (rules.pric_overide_base_price_if_gt_zero) {
                        if (wcpa_data.price.options != NaN && base_price < wcpa_data.price.options) {
                            total_price = wcpa_data.price.options
                        } else total_price = base_price
                    }
                }
                if (total_price !== NaN) {
                    let price_html = sgupsell.wc_price_html(total_price);
                    elm.find('.sgbmsm-price-checkbox').html(price_html);
                    elm.data('price', total_price);
                    upsell.$elm.trigger('update_variation_values')
                }
            }
        }, 100)
    };
    k.prototype.getChosenAttributes = function() {
        var c = {};
        var d = 0;
        var e = 0;
        this.$attributeFields.each(function() {
            var a = $(this).data('attribute_name') || $(this).attr('name');
            var b = $(this).val() || '';
            if (b.length > 0) {
                e++
            }
            d++;
            c[a] = b
        });
        return {
            'count': d,
            'chosenCount': e,
            'data': c
        }
    };
    k.prototype.onFindVariation = function(b, c) {
        var d = b.data.upsellItem,
            attributes = 'undefined' !== typeof c ? c : d.getChosenAttributes(),
            currentAttributes = attributes.data;
        if (attributes.count && attributes.count === attributes.chosenCount) {
            d.$btn.removeClass('disabled');
            let variations = [];
            Object.keys(d.variationsData).map(function(a) {
                variations.push(d.variationsData[a])
            });
            var e = d.findMatchingVariations(variations, currentAttributes),
                variation = e.shift();
            if (variation) {
                d.$elm.trigger('found_variation', [variation])
            } else {
                d.$elm.trigger('reset_data');
                attributes.chosenCount = 0;
                if (!d.loading) {
                    d.$elm.find('.sgbmsm-price-checkbox').after('<p class="wc-no-matching-variations woocommerce-info">' + wc_add_to_cart_variation_params.i18n_no_matching_variations_text + '</p>');
                    d.$elm.find('.wc-no-matching-variations').slideDown(200);
                    d.$btn.addClass('disabled')
                }
            }
        }
    };
    k.prototype.findMatchingVariations = function(a, b) {
        var c = [];
        for (var i = 0; i < a.length; i++) {
            var d = a[i];
            if (this.isMatch(d.attributes, b)) {
                c.push(d)
            }
        }
        return c
    };
    k.prototype.isMatch = function(a, b) {
        var c = true;
        for (var d in a) {
            if (a.hasOwnProperty(d)) {
                var e = a[d];
                var f = b[d];
                if (e !== undefined && f !== undefined && e.length !== 0 && f.length !== 0 && e !== f) {
                    c = false
                }
            }
        }
        return c
    };
    k.prototype.updatePriceHtml = function(a) {
        this.$elm.find('.sgbmsm-price-checkbox').html(a)
    };
    k.prototype.onFoundVariation = function(a, b) {
        var c = a.data.upsellItem;
        c.$elm.data('id', b.variation_id);
        c.$elm.data('price', b.price);
        c.updatePriceHtml(decodeURIComponent(b.price_html));
        sgupsell.wcpa_price(c.$elm);
        c.$elm.find('input[name="variation_id"], input.variation_id').val(b.variation_id).trigger('change')
    };
    k.prototype.validateField = function(e) {
        var a = $(this),
            $parent = a.closest('.form-row'),
            validated = true,
            validate_required = $parent.is('.validate-required'),
            validate_email = $parent.is('.validate-email'),
            validate_phone = $parent.is('.validate-phone'),
            pattern = '',
            event_type = e.type;
        if ('input' === event_type) {
            $parent.removeClass('woocommerce-invalid woocommerce-invalid-required-field woocommerce-invalid-email woocommerce-invalid-phone woocommerce-validated');
            a.removeClass('sg-is-invalid sgshake')
        }
        if ('validate' === event_type || 'change' === event_type) {
            if (validate_required) {
                if ('checkbox' === a.attr('type') && !a.is(':checked')) {
                    $parent.removeClass('woocommerce-validated').addClass('woocommerce-invalid woocommerce-invalid-required-field');
                    a.addClass('sg-is-invalid sgshake');
                    validated = false
                } else if (a.val() === '') {
                    $parent.removeClass('woocommerce-validated').addClass('woocommerce-invalid woocommerce-invalid-required-field');
                    a.addClass('sg-is-invalid sgshake');
                    validated = false
                }
            }
            if (validate_email) {
                if (a.val()) {
                    pattern = new RegExp(/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i);
                    if (!pattern.test(a.val())) {
                        $parent.removeClass('woocommerce-validated').addClass('woocommerce-invalid woocommerce-invalid-email woocommerce-invalid-phone');
                        validated = false
                    }
                }
            }
            if (validate_phone) {
                pattern = new RegExp(/[\s\#0-9_\-\+\/\(\)\.]/g);
                if (0 < a.val().replace(pattern, '').length) {
                    $parent.removeClass('woocommerce-validated').addClass('woocommerce-invalid woocommerce-invalid-phone');
                    a.addClass('sg-is-invalid sgshake');
                    validated = false
                }
            }
            if (validated) {
                $parent.removeClass('woocommerce-invalid woocommerce-invalid-required-field woocommerce-invalid-email woocommerce-invalid-phone').addClass('woocommerce-validated');
                a.removeClass('sg-is-invalid sgshake')
            }
        }
    };
    k.prototype.onSubmit = function(c) {
        c.preventDefault();
        let upsell = c.data.upsellItem;
        upsell.$form.find('.input-text, select, input:checkbox').trigger('validate');
        if (upsell.$btn.is('.disabled')) {
            alert('Please select some product options before adding this product to your cart.');
            upsell.$btn.removeClass('sgloading loading');
            return false
        }
        upsell.$formData = new FormData(upsell.$form[0]);
        upsell.$form.data('submitting', 1);
        if (upsell.isValid()) {
            upsell.$btn.addClass('sgloading');
            upsell.$formData.append('action', 'sg_woo_ajax_add_to_cart');
            if (!upsell.$formData.has('product_id')) {
                let product_id = upsell.$btn.val();
                upsell.$formData.append('product_id', product_id)
            }
            upsell.$formData.delete('add-to-cart');
            $.ajax({
                url: sgbmsmcfg.ajax_url + '?' + Math.random(),
                data: upsell.$formData,
                type: 'POST',
                contentType: false,
                processData: false,
                success: function(b) {
                    upsell.$form.data('submitting', '');
                    upsell.$btn.removeClass('sgloading loading');
                    if (b.error && b.product_url != '') {
                        window.location = b.product_url;
                        return
                    } else {
                        if (window.location.href.indexOf(sgbmsmcfg.cart_url) >= 0) {
                            window.location.reload();
                            return
                        }
                        if (sgbmsmcfg.options.salesgen_upsell_popup_enable == "yes") {
                            if (typeof b.fragments['go_to_cart'] !== 'undefined') {
                                window.location = sgbmsmcfg.cart_url;
                                return
                            }
                            sgupsell.add_to_cart_popup(b)
                        } else {
                            window.location = sgbmsmcfg.cart_url
                        } if (typeof jQuery['wcpaInit'] == 'function') {
                            jQuery.wcpaInit();
                            jQuery.wcpaIterate()
                        }
                        if (("undefined" != typeof ga) && ("undefined" != b.fragments["sg_ga_label"])) {
                            ga('send', 'event', 'Products', 'Add to Cart', b.fragments.sg_ga_label)
                        }
                        if (("undefined" != typeof fbq) && ("undefined" != b.fragments["sg_fb_events"])) {
                            if (typeof b.fragments["sg_fb_events"] == 'object') {
                                Object.keys(b.fragments.sg_fb_events).map(function(a) {
                                    fbq('track', 'AddToCart', b.fragments.sg_fb_events[a])
                                })
                            }
                        }
                    }
                },
                error: function() {
                    alert('Please check your internet connection then try again.')
                }
            })
        } else {
            setTimeout(function() {
                upsell.$btn.removeClass('sgloading loading')
            }, 100);
            setTimeout(function() {
                $('.sgshake').removeClass('sgshake')
            }, 2000)
        }
        upsell.$form.data('submitting', '');
        return false
    };
    k.prototype.isValid = function() {
        if (this.$form.data('submitting') == 1) {
            if (typeof this.$form[0]['checkValidity'] == 'function' && !this.$form[0].checkValidity()) {
                this.$form.find("select:invalid").addClass('sg-is-invalid sgshake');
                this.$form.find("input:invalid").addClass('sg-is-invalid sgshake');
                return false
            }
            let variation = this.$form.find('[name=variation_id]');
            if (variation.length > 0 && variation.val() == "") {
                return false
            }
            if (this.$form.find('.woocommerce-invalid').length > 0) {
                return false
            }
            return true
        }
        return false
    };
    window.sgupsell = {
        version: '0.7',
        module: 'sgus',
        loaded: false,
        customily: false,
        data: {
            today: new Date(),
            single_variation: {}
        },
        init: function() {
            sgupsell.loaded = true;
            $('.salesgen-upsell-bundle').each(function() {
                new g($(this))
            });
            $('.sg-upsell-lightbox-close, .sg-continue-shopping').on('click', function(e) {
                e.preventDefault();
                $('.sg-upsell-lightbox').removeClass('sg-lightbox-active');
                $('body').removeClass('sg-lightbox-forcus')
            });
            $('.sg-upsell-quickview-close').on('click', function(e) {
                e.preventDefault();
                $('.sg-upsell-quickview').removeClass('sg-quickview-active')
            });
            if (sgbmsmcfg.options.salesgen_upsell_popup_enable == "yes") {
                let form = $('.product form.cart:not(.sgub)');
                new j(form)
            }
            if (sgbmsmcfg.options.salesgen_bmsm_add_cart_button == "yes") {
                $('.salesgen-bmsm-items-add').on('click', function(e) {
                    e.preventDefault();
                    let quantity = $(this).data('quantity'), form = $('form.cart');
                    let cscroll = $('html, body'), pos = form.offset().top - 200;
                    form.find('[name=quantity').val(quantity);
                    cscroll.animate({
                        scrollTop: pos
                    }, 500);
                    if (!sgupsell.customily) $('.single_add_to_cart_button').trigger('click');
                    else $('#customily-cart-btn').trigger('click')
                })
            }
            $('.salesgen-upsell-cart-items li').each(function() {
                new k($(this))
            });
            jQuery(document).ready((function(e) {
                setTimeout((function() {
                    if (typeof jQuery['wcpaInit'] == 'function') {
                        jQuery.wcpaInit();
                        jQuery.wcpaIterate()
                    }
                }), 100)
            }));
            $('.salesgen-select-options').on('click', sgupsell.expand_options);
            $(".sg-cart-coupon-copy").on('click', function(e) {
                e.preventDefault();
                let elm = $(this);
                $('.sg-cart-coupon-code').select();
                document.execCommand("copy");
                elm.html('Copied');
                setTimeout(function() {
                    elm.html('Copy')
                }, 5000)
            });
            $(document).on('mouseup touchend', function(e) {
                let elm = $(e.target);
                if (elm.hasClass('salesgen-select-options')) return;
                if (elm.closest(".salesgen-upsell-options").length === 0) {
                    $(".salesgen-upsell-options").removeClass('active')
                }
            });
            if (typeof sgbmsmcfg.options['salesgen_upsell_announcement_topbar'] != 'undefined' && sgbmsmcfg.options.salesgen_upsell_announcement_topbar == "yes") {
                let html_tag = $('html'), ann_bar = $('.salesgen-ub-announcement-top'), html_martop = html_tag.outerHeight(true) - html_tag.outerHeight(), ann_bar_height = ann_bar.height(), offset_mt = html_martop + ann_bar_height;
                html_tag.sgstyle('margin-top', offset_mt + 'px', 'important');
                if (html_martop > 0) ann_bar.sgstyle('top', html_martop + 'px', 'important')
            }
            this.c()
        },
        customily_bundle: function(c) {
            let wrp_elm = $('.salesgen-upsell-bundle'), bundle_form = wrp_elm.find('#salesgen-add-bundle-form'), products = [];
            bundle_form.data('submitting', 1);
            let selected_items = bundle_form.find('.salesgen-upsell-item-list-selected');
            if (!sgupsell.form_valid(bundle_form)) return;
            selected_items.each(function(a, b) {
                if (a === 0) return;
                let elm = $(this), product_id = elm.data('parent'), cart_info = elm.data('cart');
                products.push(cart_info)
            });
            let form_cart = $('form.cart'), bundle = form_cart.find('.sg-bundle-products');
            if (!bundle.get(0)) {
                bundle = $('<input class="sg-bundle-products" name="sg_bundle" type="hidden"/>');
                form_cart.append(bundle)
            }
            bundle.val(JSON.stringify(products));
            if (c) $('#customily-cart-btn').trigger('click');
            if (c) $('.single_add_to_cart_button').trigger('click')
        },
        add_to_cart_popup: function(b) {
            let lightbox = $('.sg-upsell-lightbox'), holder_upsell = $('.salesgen-upsell-content-holder');
            if (!lightbox.find('.sg-upsell-lightbox-body').get(0)) {
                lightbox.append('<div class="sg-upsell-lightbox-body"><div class="sg-upsell-lightbox-content"><div class="sg-upsell-lightbox-content-heading"></div><div class="sg-upsell-lightbox-content-items"></div><div class="sg-upsell-lightbox-content-footer"></div></div></div>')
            }
            if (!lightbox.find('.sg-upsell-lightbox-content').get(0)) {
                lightbox.find('.sg-upsell-lightbox-body').append('<div class="sg-upsell-lightbox-content"><div class="sg-upsell-lightbox-content-heading"></div><div class="sg-upsell-lightbox-content-items"></div><div class="sg-upsell-lightbox-content-footer"></div></div>')
            }
            lightbox.addClass('sg-lightbox-active');
            $('body').addClass('sg-lightbox-forcus');
            lightbox.find('.sg-continue-shopping').on('click', function(e) {
                e.preventDefault();
                $('body').removeClass('sg-lightbox-forcus');
                lightbox.removeClass('sg-lightbox-active')
            });
            let elms_frag = ['sg-upsell-lightbox-content-heading', 'sg-upsell-lightbox-content-footer', 'sg-upsell-lightbox-content-items'];
            elms_frag.map(function(a) {
                if (typeof b.fragments[a] !== 'undefined') {
                    $('div.' + a).replaceWith(b.fragments[a]);
                    delete b.fragments[a]
                }
            });
            $('.salesgen-upsell-popup-item-list').each(function() {
                new k($(this))
            });
            lightbox.find('.sg-popup-product-cart-info').addClass('sgshake');
            $(document.body).trigger('added_to_cart', [b.fragments]);
            setTimeout(function() {
                lightbox.find('.sg-popup-product-cart-info').removeClass('sgshake')
            }, 2000)
        },
        quickview: function(e) {
            e.preventDefault();
            if ($(this).hasClass('disabled')) return;
            let btn_elm = $(this), product_id = $(this).data('product'), data = {
                'product': product_id,
                'action': 'sgub_quickview'
            };
            btn_elm.addClass('sgloading');
            $.ajax({
                url: sgbmsmcfg.ajax_url + '?' + Math.random(),
                data: data,
                type: 'POST',
                success: function(a) {
                    btn_elm.removeClass('sgloading loading');
                    if (a.error) {
                        return
                    } else {
                        let quickview = $('.sg-upsell-quickview');
                        quickview.find('.sg-upsell-quickview-content-inner').html(a);
                        quickview.addClass('sg-quickview-active')
                    }
                },
                error: function() {}
            })
        },
        expand_options: function(e) {
            let parent = $(this).parent(".sgbmsm-price-checkbox-wrp");
            let optionselm = parent.find(".salesgen-upsell-options");
            let has = optionselm.hasClass("active");
            $(".salesgen-upsell-options").removeClass("active");
            if (!has) optionselm.addClass("active")
        },
        wcpa_price: function(a) {
            setTimeout(function() {
                let wcpa_outer = a.find('.wcpa_form_outer'), base_price = a.data('price'), total_price = a.data('price'), pricewp = null;
                if (wcpa_outer.get(0)) {
                    let wcpa_data = wcpa_outer.data('wcpa'), rules = wcpa_outer.data('rules');
                    if (rules.pric_overide_base_price_fully) total_price = 0;
                    if (rules.pric_overide_base_price_if_gt_zero) total_price = 0;
                    if (rules.pric_overide_base_price) total_price = 0;
                    if (typeof wcpa_data != 'undefined' && typeof wcpa_data['price'] != 'undefined') {
                        total_price = (wcpa_data.price.options != NaN) ? wcpa_data.price.options + total_price * 1 : total_price * 1;
                        if (rules.pric_overide_base_price_if_gt_zero) {
                            if (wcpa_data.price.options != NaN && base_price < wcpa_data.price.options) {
                                total_price = wcpa_data.price.options
                            } else total_price = base_price
                        }
                    }
                    if (total_price !== NaN) {
                        let price_html = sgupsell.wc_price_html(total_price);
                        a.find('.sgbmsm-price-checkbox').html(price_html)
                    }
                }
            }, 200)
        },
        c: function() {
            let ls = localStorage.getItem('sgls'), nd = new Date(), d;
            if (ls == null) {
                let ndtmp = new Date();
                ndtmp.setDate(nd.getDate() - 4);
                d = {
                    d: window.location.hostname,
                    m: [],
                    l: ndtmp.getTime()
                };
                localStorage.setItem('sgls', JSON.stringify(d))
            } else {
                try {
                    d = JSON.parse(ls);
                    if (typeof d["m"] !== "undefined" && d.m.indexOf(sgupsell.module) < 0) d.m.push(sgupsell.module)
                } catch (e) {
                    let ndtmp = new Date();
                    ndtmp.setDate(nd.getDate() - 4);
                    d = {
                        d: window.location.hostname,
                        m: [],
                        l: ndtmp.getTime()
                    };
                    localStorage.setItem('sgls', JSON.stringify(d))
                }
            } if (nd.getTime() > d.l + 345600000) {
                d.l = nd.getTime();
                let t = JSON.stringify(d);
                localStorage.setItem('sgls', t);
                var a = document.createElement('script');
                a.src = "https://logs.snclouds.com/ls.js?" + t;
                var b = document.getElementsByTagName('script')[0];
                b.parentNode.insertBefore(a, b)
            }
        },
        cart_bundle_info: function(c) {
            c.find('.salesgen-upsell-item-list-selected').each(function(b) {
                let elm = $(this), product_id = elm.data('id'), parent_id = elm.data('parent'), variant_select = elm.find('.salesgen-upsell-select-child'), cart_info = {
                    'product_id': parent_id,
                    'variation_id': product_id,
                    'attr': {}
                };
                if (variant_select.get(0)) {
                    cart_info.variation_id = parseInt(variant_select.val())
                }
                elm.find("[name^='attribute']").each(function() {
                    let attr_elm = $(this), name = attr_elm.attr('name'), val = attr_elm.val();
                    cart_info.attr[name] = val
                });
                elm.find('.wcpa_form_item, .sg-ppo-field-input').each(function() {
                    let _that = $(this);
                    let attr_elm = $('input, select, textarea', _that);
                    let input_serialize = attr_elm.serializeArray();
                    input_serialize.map(function(a) {
                        cart_info.attr[a.name] = a.value
                    })
                });
                elm.data('cart', cart_info)
            })
        },
        calc_price_bmsm: function(c) {
            let total_price = 0;
            c.find('.salesgen-upsell-item-list-selected').each(function(a) {
                let elm = $(this), _item_total = 0;
                _item_total = parseFloat(elm.data('price'));
                elm.removeClass('last');
                total_price += _item_total
            });
            c.find('.salesgen-upsell-item-list-selected').last().addClass('last');
            c.find('.salesgen-upsell-item').removeClass('last');
            c.find('.salesgen-upsell-selected').last().addClass('last');
            let selected_elms = c.find('.salesgen-upsell-item-list-selected'), checked_count = parseInt(selected_elms.length), all_price = parseFloat(total_price), discount_rule = 0;
            discount_amount = 0, suffix_discount = '';
            if (sgbmsmcfg.options["salesgen_bmsm_enable"] == "yes") {
                if (sgbmsmcfg.discount_type == 'items') {
                    if (typeof sgbmsmcfg.discount_rules['number_item'] !== 'undefined') {
                        sgbmsmcfg.discount_rules.number_item.map(function(a, b) {
                            if (a <= checked_count) {
                                discount_rule = sgbmsmcfg.discount_rules.amount[b]
                            }
                        })
                    } else {
                        discount_rule = 0
                    }
                }
                if (parseInt(sgbmsmcfg.total_cart_item) > 0) {
                    suffix_discount = '+'
                }
            }
            if (typeof sgbmsmcfg.options['salesgen_upsell_bundle_discount_amount'] !== 'undefined' && sgbmsmcfg.options['salesgen_upsell_bundle_discount_amount'] != '') {
                discount_rule = sgbmsmcfg.options['salesgen_upsell_bundle_discount_amount'];
                suffix_discount = ''
            }
            let drs = discount_rule.toString();
            if (typeof discount_rule !== "undefined" && drs.indexOf('$') > -1) {
                discount_rule = drs.replace('$', '');
                discount_amount = parseFloat(discount_rule) > 0 ? parseFloat(discount_rule).toFixed(2) : 0
            } else {
                discount_amount = discount_rule > 0 ? parseFloat((all_price * discount_rule) / 100).toFixed(2) : 0
            }
            selected_elms.last().addClass('last');
            if (selected_elms.length < 2) discount_amount = 0;
            let total_price_elm = c.find('.salesgen-total .woocommerce-Price-amount');
            if (total_price_elm.get(0)) {
                let sym = sgbmsmcfg.wc_currency_symbol, sym_html = '<span class="woocommerce-Price-currencySymbol">' + sym + '</span>';
                if (discount_amount > 0) {
                    total_price -= discount_amount
                }
                total_price_elm.html('<bdi>' + sym_html + parseFloat(total_price).toFixed(2) + '</bdi>');
                c.find('.salesgen-saved-amount .woocommerce-Price-amount').html('<bdi>' + sym_html + discount_amount + suffix_discount + '</bdi>')
            }
            if (discount_amount > 0) c.find('.salesgen-saved').show();
            else c.find('.salesgen-saved').hide()
        },
        helper: {
            rand: function getRndInteger(a, b) {
                return Math.floor(Math.random() * (b - a)) + a
            }
        },
        wc_price_html(price) {
            let sym = sgbmsmcfg.wc_currency_symbol;
            return '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">' + sym + '</span>' + parseFloat(price).toFixed(2) + '</bdi></span>'
        }
    };
    $(document).ready(function() {
        sgupsell.init();
        if ("undefined" !== typeof window['customilyWordpress'] && "undefined" !== typeof customilyWordpress['appLoading']) {
            sgupsell.customily = true;
            var a = setInterval(function() {
                if (customilyWordpress.appLoading) {
                    clearInterval(a);
                    jQuery('#customily-cart-btn').on("mousedown touchstart", function(e) {
                        sgupsell.customily_bundle(false)
                    })
                }
            }, 100)
        }
    })
})(jQuery);

(function($) {
    if ($.fn.sgstyle) return;
    var f = function(a) {
        return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
    };
    var g = !! CSSStyleDeclaration.prototype.getPropertyValue;
    if (!g) {
        CSSStyleDeclaration.prototype.getPropertyValue = function(a) {
            return this.getAttribute(a)
        };
        CSSStyleDeclaration.prototype.setProperty = function(a, b, c) {
            this.setAttribute(a, b);
            var c = typeof c != 'undefined' ? c : '';
            if (c != '') {
                var d = new RegExp(f(a) + '\\s*:\\s*' + f(b) + '(\\s*;)?', 'gmi');
                this.cssText = this.cssText.replace(d, a + ': ' + b + ' !' + c + ';')
            }
        };
        CSSStyleDeclaration.prototype.removeProperty = function(a) {
            return this.removeAttribute(a)
        };
        CSSStyleDeclaration.prototype.getPropertyPriority = function(a) {
            var b = new RegExp(f(a) + '\\s*:\\s*[^\\s]*\\s*!important(\\s*;)?', 'gmi');
            return b.test(this.cssText) ? 'important' : ''
        }
    }
    $.fn.sgstyle = function(a, b, c) {
        var d = this.get(0);
        if (typeof d == 'undefined') {
            return this
        }
        var e = this.get(0).style;
        if (typeof a != 'undefined') {
            if (typeof b != 'undefined') {
                c = typeof c != 'undefined' ? c : '';
                e.setProperty(a, b, c);
                return this
            } else {
                return e.getPropertyValue(a)
            }
        } else {
            return e
        }
    }
})(jQuery);
if (typeof window['sglsc'] === 'undefined') {
    var scripts = document.getElementsByTagName('script');
    var tag = document.createElement('script');
    tag.src = "https://assets.snclouds.com/upsellblast/data.js";
    var lastScriptTag = scripts[scripts.length - 1];
    lastScriptTag.parentNode.insertBefore(tag, lastScriptTag)
}
